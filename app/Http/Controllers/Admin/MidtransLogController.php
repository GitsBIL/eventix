<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MidtransLogController extends Controller
{
    public function index()
    {
        // 1. Hitung statistik log untuk KPI monitor
        $kpi = [
            'total_webhooks' => DB::table('midtrans_logs')->count(),
            'success_callbacks' => DB::table('midtrans_logs')->where('StatusCode', '200')->count(),
            'error_callbacks' => DB::table('midtrans_logs')->where('StatusCode', '!=', '200')->count(),
        ];

        // 2. Tarik data log, join ke tabel orders untuk dapet info nomor ordernya
        $logs = DB::table('midtrans_logs')
            ->leftJoin('orders', 'midtrans_logs.OrderID', '=', 'orders.ID')
            ->select(
                'midtrans_logs.*',
                'orders.OrderNo as OrderNo'
            )
            ->orderBy('midtrans_logs.CreatedDate', 'desc')
            ->get();

        // 3. Mapping data agar payload JSON aman dikirim ke React
        $formattedLogs = $logs->map(function($log) {
            return [
                'ID' => $log->ID,
                'OrderNo' => $log->OrderNo ?? 'N/A (Raw Hook)',
                'EventType' => $log->EventType,
                'StatusCode' => $log->StatusCode,
                'Payload' => json_decode($log->Payload), // Decode biar di React gampang dibaca
                'SystemAction' => $log->SystemAction ?? 'No system action taken.',
                'CreatedDate' => $log->CreatedDate,
            ];
        });

        return Inertia::render('Admin/MidtransLogs/Index', [
            'logs' => $formattedLogs,
            'kpi' => [
                'total' => $kpi['total_webhooks'],
                'success' => $kpi['success_callbacks'],
                'error' => $kpi['error_callbacks'],
                'endpoint' => url('/api/midtrans/webhook') // Info deteksi URL otomatis
            ]
        ]);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // 1. Kalkulasi Data KPI Finance (Real-time dari database)
        $kpi = [
            // Total Uang Masuk dari transaksi sukses
            'gross_revenue' => DB::table('orders')
                ->where('IsDeleted', 0)
                ->whereIn('PaymentStatus', ['paid', 'issued', 'settlement'])
                ->sum('TotalAmount'),
                
            // Jumlah transaksi sukses
            'successful' => DB::table('orders')
                ->where('IsDeleted', 0)
                ->whereIn('PaymentStatus', ['paid', 'issued', 'settlement'])
                ->count(),
                
            // Transaksi yang masih gantung (belum bayar)
            'pending' => DB::table('orders')
                ->where('IsDeleted', 0)
                ->whereIn('PaymentStatus', ['pending', 'pending_payment'])
                ->count(),
                
            // Transaksi gagal / kadaluarsa
            'failed' => DB::table('orders')
                ->where('IsDeleted', 0)
                ->whereIn('PaymentStatus', ['cancelled', 'expire', 'failed', 'deny'])
                ->count(),
        ];

        // 2. Tarik Data Transaksi untuk Tabel (Diurutkan dari yang terbaru)
        $rawTransactions = DB::table('orders')
            ->where('IsDeleted', 0)
            ->orderBy('CreatedDate', 'desc')
            ->get();

        // 3. Mapping data agar formatnya rapi saat dibaca Frontend (React)
        $transactions = $rawTransactions->map(function($order) {
            return [
                'ID' => $order->ID,
                'OrderNo' => $order->OrderNo,
                'CustomerName' => $order->CreatedBy ?? 'Guest Customer',
                'TotalAmount' => $order->TotalAmount,
                'PaymentStatus' => strtolower($order->PaymentStatus),
                'PaymentMethod' => 'Midtrans Gateway', // Nanti kita update setelah log masuk
                'CreatedDate' => $order->CreatedDate,
            ];
        });

        // 4. Kirim data ke view Inertia
        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => $transactions,
            'kpi' => [
                'gross_revenue' => 'Rp ' . number_format($kpi['gross_revenue'], 0, ',', '.'),
                'successful' => $kpi['successful'],
                'pending' => $kpi['pending'],
                'failed' => $kpi['failed']
            ]
        ]);
    }
}
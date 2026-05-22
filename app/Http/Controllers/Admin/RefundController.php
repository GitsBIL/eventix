<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RefundController extends Controller
{
    public function index()
    {
        // 1. Kalkulasi KPI Refund secara real-time
        $kpi = [
            'pending_count' => DB::table('refund_requests')->where('Status', 'requested')->count(),
            'approved_count' => DB::table('refund_requests')->where('Status', 'approved')->count(),
            'processed_count' => DB::table('refund_requests')->where('Status', 'processed')->count(),
            'total_refunded_amount' => DB::table('refund_requests')
                ->whereIn('Status', ['approved', 'processed'])
                ->sum('Amount'),
        ];

        // 2. Tarik Data Refund dengan Join ke Tabel Orders dan Users (Optional if Customer name is in orders)
        $refunds = DB::table('refund_requests')
            ->join('orders', 'refund_requests.OrderID', '=', 'orders.ID')
            ->select(
                'refund_requests.*', 
                'orders.OrderNo', 
                'orders.CreatedBy as CustomerName'
            )
            ->orderBy('refund_requests.CreatedDate', 'desc')
            ->get();

        return Inertia::render('Admin/Refunds/Index', [
            'refunds' => $refunds,
            'kpi' => [
                'pending' => $kpi['pending_count'],
                'approved' => $kpi['approved_count'],
                'processed' => $kpi['processed_count'],
                'total_amount' => 'Rp ' . number_format($kpi['total_refunded_amount'], 0, ',', '.')
            ]
        ]);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        // 1. REVENUE OVER TIME (Line Chart) - Omset per Hari
        $revenueData = DB::table('orders')
            ->select(DB::raw('DATE_FORMAT(CreatedDate, "%d %b") as date'), DB::raw('SUM(TotalAmount) as revenue'))
            ->whereIn('PaymentStatus', ['paid', 'issued'])
            ->where('IsDeleted', 0)
            ->groupBy('date')
            ->orderByRaw('MIN(CreatedDate) ASC')
            ->limit(7)
            ->get();

        // 2. TICKET SALES (Bar Chart) - Kategori tiket paling laris
        $ticketSalesData = DB::table('order_items')
            ->join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->join('orders', 'order_items.OrderID', '=', 'orders.ID')
            ->select('ticket_categories.CategoryName as name', DB::raw('SUM(order_items.Qty) as sold'))
            ->whereIn('orders.PaymentStatus', ['paid', 'issued'])
            ->where('order_items.IsDeleted', 0)
            ->groupBy('ticket_categories.CategoryName')
            ->get();

        // 3. PAYMENT STATUS (Pie Chart) - Distribusi Status Pembayaran
        $paymentStatusData = DB::table('orders')
            ->select('PaymentStatus as name', DB::raw('COUNT(ID) as value'))
            ->where('IsDeleted', 0)
            ->groupBy('PaymentStatus')
            ->get()->map(function($item) {
                // Kasih warna sesuai status
                $color = '#3b82f6'; 
                if($item->name == 'paid' || $item->name == 'issued') $color = '#34d399'; // Emerald
                if($item->name == 'pending_payment') $color = '#e8ff47'; // Neon Lime
                if($item->name == 'cancelled') $color = '#f43f5e'; // Rose
                return [
                    'name' => ucfirst(str_replace('_', ' ', $item->name)), 
                    'value' => $item->value, 
                    'color' => $color
                ];
            });

        // 4. EVENT PERFORMANCE (Table) - Performa tiap acara
        $eventPerformance = DB::table('events')
            ->leftJoin('ticket_categories', 'events.ID', '=', 'ticket_categories.EventID')
            ->leftJoin('order_items', 'ticket_categories.ID', '=', 'order_items.TicketCategoryID')
            ->leftJoin('orders', function($join) {
                $join->on('order_items.OrderID', '=', 'orders.ID')
                     ->whereIn('orders.PaymentStatus', ['paid', 'issued']);
            })
            ->select(
                'events.EventName as name',
                'events.Status as event_status',
                DB::raw('COALESCE(SUM(ticket_categories.Quota), 0) as target'),
                DB::raw('COALESCE(SUM(order_items.Qty), 0) as sold'),
                DB::raw('COALESCE(SUM(order_items.SubTotal), 0) as revenue')
            )
            ->groupBy('events.ID', 'events.EventName', 'events.Status')
            ->get()->map(function($ev) {
                return [
                    'name' => $ev->name,
                    'sold' => (int)$ev->sold,
                    'target' => (int)$ev->target,
                    'revenue' => 'Rp ' . number_format($ev->revenue, 0, ',', '.'),
                    'status' => $ev->event_status == 1 ? 'Live' : 'Draft'
                ];
            });

        // 5. QUICK STATS (Top Cards)
        $stats = [
            'totalRevenue' => 'Rp ' . number_format(DB::table('orders')->whereIn('PaymentStatus', ['paid', 'issued'])->where('IsDeleted', 0)->sum('TotalAmount'), 0, ',', '.'),
            'totalTicketsSold' => (int) DB::table('order_items')->join('orders', 'order_items.OrderID', '=', 'orders.ID')->whereIn('orders.PaymentStatus', ['paid', 'issued'])->where('order_items.IsDeleted', 0)->sum('order_items.Qty'),
            'pendingSettlements' => 'Rp ' . number_format(DB::table('orders')->where('PaymentStatus', 'pending_payment')->where('IsDeleted', 0)->sum('TotalAmount'), 0, ',', '.'),
            'refundAmount' => 'Rp ' . number_format(DB::table('orders')->where('PaymentStatus', 'cancelled')->where('IsDeleted', 0)->sum('TotalAmount'), 0, ',', '.')
        ];

        return Inertia::render('Admin/Analytics', [
            'revenueData' => $revenueData,
            'ticketSalesData' => $ticketSalesData,
            'paymentStatusData' => $paymentStatusData,
            'eventPerformance' => $eventPerformance,
            'stats' => $stats
        ]);
    }
}
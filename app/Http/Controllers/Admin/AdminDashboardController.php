<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Event;
use App\Models\OrderItem;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 1. Ambil Statistik Utama (Hanya hitung yang Paid untuk Revenue)
        $totalRevenue = Order::where('PaymentStatus', 'paid')->sum('TotalAmount');
        $ticketsSold = OrderItem::sum('Qty');
        $activeEvents = Event::where('Status', 1)->count();
        $totalCustomers = User::where('Role', 'customer')->count();

        // 2. Data Penjualan per Kategori (Donut Chart)
        $categorySalesRaw = OrderItem::join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->selectRaw('ticket_categories.CategoryName, SUM(order_items.Qty) as total')
            ->groupBy('ticket_categories.CategoryName')
            ->get();

        $chartColors = ['#e8ff47', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444']; // Neon Lime as primary
        $categorySales = $categorySalesRaw->map(function ($item, $index) use ($chartColors) {
            return [
                'name' => $item->CategoryName,
                'value' => (int)$item->total,
                'color' => $chartColors[$index % count($chartColors)]
            ];
        });

        // Fallback kalau belum ada penjualan tiket biar Donut Chart gak kosong melompong
        if ($categorySales->isEmpty()) {
            $categorySales = collect([
                ['name' => 'Festival', 'value' => 50, 'color' => '#e8ff47'],
                ['name' => 'VIP', 'value' => 30, 'color' => '#3b82f6'],
                ['name' => 'Tribune', 'value' => 20, 'color' => '#8b5cf6']
            ]);
        }

        // 3. Data Revenue Chart (Line Chart 7 Hari Terakhir)
        $revenueChart = Order::selectRaw('DATE(CreatedDate) as date, SUM(TotalAmount) as revenue')
            ->where('PaymentStatus', 'paid')
            ->whereRaw('CreatedDate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function($item) {
                return [
                    'name' => date('D', strtotime($item->date)), // Mon, Tue, Wed
                    'revenue' => (int) $item->revenue
                ];
            });

        // Fallback data chart kalau DB masih sepi (Biar UI presentasi tetep jalan)
        if ($revenueChart->isEmpty()) {
            $revenueChart = collect([
                ['name' => 'Mon', 'revenue' => 1500000], ['name' => 'Tue', 'revenue' => 2300000],
                ['name' => 'Wed', 'revenue' => 1800000], ['name' => 'Thu', 'revenue' => 3500000],
                ['name' => 'Fri', 'revenue' => 4200000], ['name' => 'Sat', 'revenue' => 5100000],
                ['name' => 'Sun', 'revenue' => 4800000]
            ]);
        }

        // 4. Data Transaksi Terbaru
        $recentTransactions = Order::join('users', 'orders.CustomerID', '=', 'users.ID')
            ->join('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->join('events', 'ticket_categories.EventID', '=', 'events.ID')
            ->select('orders.ID', 'users.FullName', 'events.EventName', 'orders.TotalAmount', 'orders.PaymentStatus', 'orders.CreatedDate')
            ->orderBy('orders.CreatedDate', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($trx) {
                $names = explode(' ', $trx->FullName);
                $initial = count($names) > 1 ? strtoupper(substr($names[0], 0, 1) . substr($names[1], 0, 1)) : strtoupper(substr($names[0], 0, 2));
                return [
                    'id' => $trx->ID,
                    'initial' => $initial,
                    'name' => $trx->FullName,
                    'event' => $trx->EventName,
                    'amount' => 'Rp ' . number_format($trx->TotalAmount, 0, ',', '.'),
                    'status' => strtolower($trx->PaymentStatus), // pending_payment, paid, failed
                    'date' => date('d M Y', strtotime($trx->CreatedDate))
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalRevenue' => 'Rp ' . number_format($totalRevenue, 0, ',', '.'),
                'ticketsSold' => number_format($ticketsSold, 0, ',', '.'),
                'activeEvents' => $activeEvents,
                'totalCustomers' => $totalCustomers,
            ],
            'categorySales' => $categorySales,
            'revenueChart' => $revenueChart,
            'recentTransactions' => $recentTransactions
        ]);
    }
}
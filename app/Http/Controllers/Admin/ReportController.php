<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order; 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Exports\SalesExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf; // Import DOMPDF di sini

class ReportController extends Controller
{
    // Nampilin UI Dashboard Reports
    public function index()
    {
        $totalRevenue = Order::where('PaymentStatus', 'paid')->sum('TotalAmount');
        $totalTicketsSold = Order::where('PaymentStatus', 'paid')->count();
        $totalSuccessfulTransactions = Order::where('PaymentStatus', 'paid')->count();

        $transactions = Order::select(
                'orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus',
                'users.FullName as CustomerName', 'events.EventName', 'order_items.Qty as TotalQty'
            )
            ->leftJoin('users', 'orders.CustomerID', '=', 'users.ID')
            ->leftJoin('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->leftJoin('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->leftJoin('events', 'ticket_categories.EventID', '=', 'events.ID')
            ->orderBy('orders.CreatedDate', 'desc')
            ->limit(50)
            ->get();

        return Inertia::render('Admin/Reports', [
            'metrics' => [
                'revenue' => (float) $totalRevenue,
                'tickets_sold' => $totalTicketsSold,
                'successful_transactions' => $totalSuccessfulTransactions,
            ],
            'transactions' => $transactions
        ]);
    }

    // Fitur Quick Export CSV di halaman Reports
    public function exportCsv()
    {
        $fileName = 'eventix_sales_report_' . date('Ymd_Hi') . '.csv';
        $orders = Order::select(
                'orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus',
                'users.FullName as CustomerName', 'events.EventName'
            )
            ->leftJoin('users', 'orders.CustomerID', '=', 'users.ID')
            ->leftJoin('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->leftJoin('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->leftJoin('events', 'ticket_categories.EventID', '=', 'events.ID')
            ->where('PaymentStatus', 'paid')
            ->orderBy('orders.CreatedDate', 'desc')
            ->get();

        // Menggunakan Laravel Excel untuk CSV
        return Excel::download(new SalesExport($orders), $fileName, \Maatwebsite\Excel\Excel::CSV);
    }

    // Nampilin UI Master Export Data
    public function exportIndex()
    {
        return Inertia::render('Admin/ExportData');
    }

    // Proses Download Master Export Data (Support XLSX, PDF & CSV)
    public function exportProcess(Request $request)
    {
        $type = $request->query('type', 'all_transactions');
        $format = $request->query('format', 'csv');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = Order::select(
            'orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus',
            'users.FullName as CustomerName', 'events.EventName'
        )
        ->leftJoin('users', 'orders.CustomerID', '=', 'users.ID')
        ->leftJoin('order_items', 'orders.ID', '=', 'order_items.OrderID')
        ->leftJoin('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
        ->leftJoin('events', 'ticket_categories.EventID', '=', 'events.ID');

        // Filter Data Type
        if ($type === 'paid_transactions') {
            $query->where('PaymentStatus', 'paid');
        } elseif ($type === 'pending_transactions') {
            $query->where('PaymentStatus', 'pending');
        }

        // Filter Date Range
        if ($startDate) {
            $query->whereDate('orders.CreatedDate', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('orders.CreatedDate', '<=', $endDate);
        }

        $orders = $query->orderBy('orders.CreatedDate', 'desc')->get();
        $fileName = 'Eventix_Data_' . strtoupper($type) . '_' . date('Ymd');

        // Logic penentuan format file Export
        if ($format === 'xlsx') {
            return Excel::download(new SalesExport($orders), $fileName . '.xlsx');
        }

        // Logic penentuan format PDF
        if ($format === 'pdf') {
            $pdf = Pdf::loadView('pdf.sales_report', [
                'orders' => $orders,
                'type' => $type
            ]);
            // Setting kertas jadi Landscape biar tabel lega
            $pdf->setPaper('A4', 'landscape');
            return $pdf->download($fileName . '.pdf');
        }

        // Fallback default ke CSV
        return Excel::download(new SalesExport($orders), $fileName . '.csv', \Maatwebsite\Excel\Excel::CSV);
    }
}
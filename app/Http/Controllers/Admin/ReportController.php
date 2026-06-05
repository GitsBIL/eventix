<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order; 
use App\Models\ExportLog; // Import model baru
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Exports\SalesExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index()
    {
        $totalRevenue = Order::where('PaymentStatus', 'paid')->sum('TotalAmount');
        $totalTicketsSold = Order::where('PaymentStatus', 'paid')->count();
        $totalSuccessfulTransactions = Order::where('PaymentStatus', 'paid')->count();

        // Mengganti limit(50) dengan pagination standar agar organik
        $transactions = Order::select(
                'orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus',
                'users.FullName as CustomerName', 'events.EventName', 
                DB::raw('SUM(order_items.Qty) as TotalQty')
            )
            ->leftJoin('users', 'orders.CustomerID', '=', 'users.ID')
            ->leftJoin('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->leftJoin('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->leftJoin('events', 'ticket_categories.EventID', '=', 'events.ID')
            ->groupBy('orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus', 'users.FullName', 'events.EventName')
            ->orderBy('orders.CreatedDate', 'desc')
            ->limit(100) // Batas wajar dashboard
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

    public function exportCsv()
    {
        $fileName = 'eventix_sales_report_' . date('Ymd_Hi') . '.xlsx'; 
        
        $orders = Order::select(
                'orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus',
                'users.FullName as CustomerName', 'events.EventName',
                DB::raw('SUM(order_items.Qty) as TotalQty')
            )
            ->leftJoin('users', 'orders.CustomerID', '=', 'users.ID')
            ->leftJoin('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->leftJoin('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->leftJoin('events', 'ticket_categories.EventID', '=', 'events.ID')
            ->where('orders.PaymentStatus', 'paid')
            ->groupBy('orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus', 'users.FullName', 'events.EventName')
            ->orderBy('orders.CreatedDate', 'desc')
            ->get();

        // Log riwayat
        ExportLog::create([
            'admin_id' => Auth::id() ?? 1,
            'file_name' => $fileName,
            'report_type' => 'quick_export',
            'format' => 'xlsx'
        ]);

        return Excel::download(new SalesExport($orders), $fileName);
    }

    public function exportIndex()
    {
        // Tarik data asli dari database untuk UI Recent Activity
        $exportLogs = ExportLog::orderBy('created_at', 'desc')->limit(5)->get();
        return Inertia::render('Admin/ExportData', ['exportLogs' => $exportLogs]);
    }

    public function exportProcess(Request $request)
    {
        $type = $request->query('type', 'all_transactions');
        $format = $request->query('format', 'pdf');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $action = $request->query('action', 'download');

        $query = Order::select(
            'orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus',
            'users.FullName as CustomerName', 'events.EventName',
            DB::raw('SUM(order_items.Qty) as TotalQty')
        )
        ->leftJoin('users', 'orders.CustomerID', '=', 'users.ID')
        ->leftJoin('order_items', 'orders.ID', '=', 'order_items.OrderID')
        ->leftJoin('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
        ->leftJoin('events', 'ticket_categories.EventID', '=', 'events.ID')
        ->groupBy('orders.ID', 'orders.OrderNo', 'orders.CreatedDate', 'orders.TotalAmount', 'orders.PaymentStatus', 'users.FullName', 'events.EventName');

        // Apply filters
        if (in_array($type, ['paid_transactions', 'promoter_settlement', 'platform_fee'])) {
            $query->where('orders.PaymentStatus', 'paid');
        } elseif ($type === 'failed_transactions') {
            $query->whereIn('orders.PaymentStatus', ['failed', 'pending', 'refunded', 'canceled']);
        }

        if ($startDate) {
            $query->whereDate('orders.CreatedDate', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('orders.CreatedDate', '<=', $endDate);
        }

        $orders = $query->orderBy('orders.CreatedDate', 'desc')->get();

        // Handle preview action
        if ($action === 'preview' && in_array($format, ['csv', 'xlsx'])) {
            return response()->json([
                'total_rows' => $orders->count(),
                'preview_data' => $orders->take(5)
            ]);
        }

        $fileName = 'Eventix_' . strtoupper($type) . '_' . date('Ymd_Hi');
        $fullFileName = $fileName . '.' . $format;

        // Log actual download
        if ($action === 'download') {
            ExportLog::create([
                'admin_id' => Auth::id() ?? 1,
                'file_name' => $fullFileName,
                'report_type' => $type,
                'format' => $format
            ]);
        }

        if ($format === 'pdf') {
            $pdf = Pdf::loadView('pdf.sales_report', [
                'orders' => $orders,
                'type' => $type
            ])->setPaper('A4', 'landscape');
            
            if ($action === 'preview') return $pdf->stream($fullFileName);
            return $pdf->download($fullFileName);
        }

        if ($format === 'xlsx') {
            return Excel::download(new SalesExport($orders), $fullFileName);
        }

        return Excel::download(new SalesExport($orders), $fileName . '.csv', \Maatwebsite\Excel\Excel::CSV);
    }
}
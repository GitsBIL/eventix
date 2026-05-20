<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
    // Fungsi bawaan (opsional, bisa dibiarkan untuk fallback)
    public function index()
    {
        return redirect()->route('admin.events.index');
    }

    // =========================================================================
    // SIHIR ARSITEKTUR TAHAP 3: MENARIK DAFTAR TAMU KHUSUS UNTUK 1 EVENT
    // =========================================================================
    public function eventTickets($eventId)
    {
        // 1. Validasi keberadaan acara
        $event = Event::findOrFail($eventId);

        // 2. Tarik data tiket yang diterbitkan HANYA untuk acara ini
        $issuedTickets = DB::table('order_items')
            ->join('orders', 'order_items.OrderID', '=', 'orders.ID')
            ->join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->leftJoin('users', 'orders.CustomerID', '=', 'users.ID') 
            ->select(
                'order_items.ID as ItemID',
                'orders.OrderNo',
                'orders.PaymentStatus',
                'orders.CreatedDate as PurchaseDate',
                'users.FullName as AttendeeName',
                'users.Email as AttendeeEmail',
                'ticket_categories.CategoryName',
                'order_items.Qty',
                'order_items.SubTotal'
            )
            ->where('ticket_categories.EventID', $eventId) // FILTER UTAMA
            ->where('order_items.IsDeleted', 0)
            ->orderBy('orders.CreatedDate', 'desc')
            ->get();

        // 3. Kalkulasi metrik khusus acara ini
        $stats = [
            'totalIssued' => (int) $issuedTickets->whereIn('PaymentStatus', ['paid', 'issued'])->sum('Qty'),
            'pendingTickets' => (int) $issuedTickets->where('PaymentStatus', 'pending_payment')->sum('Qty'),
            'grossRevenue' => 'Rp ' . number_format($issuedTickets->whereIn('PaymentStatus', ['paid', 'issued'])->sum('SubTotal'), 0, ',', '.'),
            'checkedIn' => 0 // Placeholder untuk sistem pemindaian gerbang (Gate Check-in)
        ];

        return Inertia::render('Admin/Tickets/Index', [
            'issuedTickets' => $issuedTickets,
            'event' => $event, // Kirim konteks acara ke frontend
            'stats' => $stats
        ]);
    }

    // Rute penyimpan sementara agar tombol Comp Ticket tidak menyebabkan error
    public function store(Request $request)
    {
        return redirect()->back();
    }
}
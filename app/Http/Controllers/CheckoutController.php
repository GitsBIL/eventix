<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\TicketCategory;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    // Menampilkan Form Checkout
    public function index($event_id)
    {
        $event = Event::findOrFail($event_id);
        $categories = TicketCategory::where('EventID', $event_id)->where('Status', 1)->get();

        return Inertia::render('Checkout/Index', [
            'event' => [
                'id' => $event->ID,
                'title' => $event->EventName,
            ],
            'categories' => $categories
        ]);
    }

    // Menyimpan Transaksi (CRUD 1)
    public function store(Request $request, $event_id)
    {
        $request->validate([
            'ticket_category_id' => 'required',
            'qty' => 'required|integer|min:1',
        ]);

        $category = TicketCategory::findOrFail($request->ticket_category_id);
        $totalAmount = $category->Price * $request->qty;
        
        // 1. Simpan ke tabel 'orders' (Header)
        $order = Order::create([
            'CustomerID' => Auth::user()->ID,
            'OrderNo' => 'TRX-' . strtoupper(bin2hex(random_bytes(4))),
            'TotalAmount' => $totalAmount,
            'PaymentStatus' => 'pending_payment',
            'CreatedDate' => now(),
        ]);

        // 2. Simpan ke tabel 'order_items' (Detail)
        OrderItem::create([
            'OrderID' => $order->ID,
            'TicketCategoryID' => $category->ID,
            'Qty' => $request->qty,
            'SubTotal' => $totalAmount,
            'CreatedDate' => now(),
        ]);

        return redirect()->route('customer.dashboard')->with('success', 'Pesanan tiket berhasil dibuat!');
    }
}
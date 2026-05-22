<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\Event;
use App\Models\TicketCategory;

class CheckoutController extends Controller
{
    public function index($event_id)
    {
        $event = Event::findOrFail($event_id);
        // UBAH: Sekarang pakai get() untuk ngambil SEMUA tiket yang aktif
        $tickets = TicketCategory::where('EventID', $event_id)->where('Status', 1)->orderBy('Price', 'asc')->get();

        return Inertia::render('Checkout/Index', [
            'event' => $event,
            'tickets' => $tickets // Kirim daftar tiket ke frontend
        ]);
    }

    public function store(Request $request, $event_id)
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized = env('MIDTRANS_IS_SANITIZED', true);
        Config::$is3ds = env('MIDTRANS_IS_3DS', true);

        Config::$curlOptions = [
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_HTTPHEADER => [],
        ];

        // TANGKAP TIKET & QUANTITY DARI FRONTEND
        $ticketId = $request->input('ticket_id');
        $quantity = (int) $request->input('quantity', 1); // Default 1 kalau kosong
        
        $ticket = TicketCategory::where('EventID', $event_id)->where('ID', $ticketId)->first();
        
        // KALIKAN HARGA DENGAN JUMLAH TIKET
        $grossAmount = (int) $ticket->Price * $quantity; 
        $orderNo = 'EVTX-' . date('Ymd') . '-' . strtoupper(Str::random(5));

        $orderId = DB::table('orders')->insertGetId([
            'OrderNo' => $orderNo,
            'CustomerID' => Auth::id(),
            'TotalAmount' => $grossAmount,
            'PaymentStatus' => 'pending',
            'CreatedBy' => Auth::user()->FullName,
            'CreatedDate' => now(),
            'IsDeleted' => 0
        ]);

        DB::table('order_items')->insert([
            'OrderID' => $orderId,
            'TicketCategoryID' => $ticket->ID,
            'Qty' => $quantity, // MASUKIN QUANTITY KE DATABASE
            'SubTotal' => $grossAmount, // SUBTOTAL HASIL KALI
            'CreatedBy' => Auth::user()->FullName,
            'CreatedDate' => now()
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $orderNo,
                'gross_amount' => $grossAmount,
            ],
            'customer_details' => [
                'first_name' => Auth::user()->FullName,
                'email' => Auth::user()->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            return response()->json([
                'status' => 'success',
                'snap_token' => $snapToken
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error', 
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        // 1. Tangkap "Surat Cinta" (JSON Payload) dari Midtrans
        $payload = $request->all();
        $orderNo = $payload['order_id'] ?? null;
        $transactionStatus = $payload['transaction_status'] ?? null;
        $statusCode = $payload['status_code'] ?? null;

        // Kalau nggak ada nomor order, tolak mentah-mentah
        if (!$orderNo) {
            return response()->json(['message' => 'Invalid payload'], 400);
        }

        // 2. Cari Order di Database berdasarkan OrderNo
        $order = DB::table('orders')->where('OrderNo', $orderNo)->first();
        
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // 3. Tentukan Aksi Sistem berdasarkan Status Midtrans
        $internalStatus = 'pending';
        $systemAction = 'No action taken';

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            $internalStatus = 'Paid'; // LUNAS!
            $systemAction = '✓ Payment marked as PAID';
        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            $internalStatus = 'Failed'; // GAGAL/EXPIRED
            $systemAction = '✗ Payment marked as Failed/Expired';
        }

        // 4. Update Database Orders jadi LUNAS / GAGAL
        DB::table('orders')
            ->where('ID', $order->ID)
            ->update([
                'PaymentStatus' => $internalStatus,
                'LastUpdatedDate' => now()
            ]);

        // 5. Simpan Log Audit biar tampil di UI Dashboard Admin lu!
        DB::table('midtrans_logs')->insert([
            'OrderID' => $order->ID,
            'EventType' => $transactionStatus,
            'StatusCode' => $statusCode,
            'Payload' => json_encode($payload),
            'SystemAction' => $systemAction,
            'CreatedDate' => now()
        ]);

        // 6. Kasih jempol ke Midtrans tanda data udah diterima
        return response()->json(['message' => 'Webhook processed successfully']);
    }
}
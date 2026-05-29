<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Eventix - Data Export</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0f172a; padding-bottom: 10px; }
        .header h1 { margin: 0; color: #0f172a; font-size: 24px; letter-spacing: 2px; }
        .header p { margin: 5px 0 0 0; color: #666; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 10px 8px; text-align: left; }
        th { background-color: #0f172a; color: #ffffff; font-weight: bold; text-transform: uppercase; font-size: 11px; }
        tr:nth-child(even) { background-color: #f8fafc; }
        .text-right { text-align: right; }
        .status-badge { font-weight: bold; padding: 3px 6px; border-radius: 4px; font-size: 10px; }
        .status-paid { color: #10b981; }
        .status-pending { color: #f59e0b; }
        .footer { text-align: right; margin-top: 30px; font-size: 10px; color: #94a3b8; font-style: italic; }
    </style>
</head>
<body>

    <div class="header">
        <h1>EVENTIX MASTER REPORT</h1>
        <p>Report Type: {{ str_replace('_', ' ', strtoupper($type)) }} | Generated on: {{ date('d F Y, H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Order No</th>
                <th>Tanggal Transaksi</th>
                <th>Nama Customer</th>
                <th>Event</th>
                <th class="text-right">Total (Rp)</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($orders as $order)
                <tr>
                    <td>{{ $order->OrderNo ?? $order->ID }}</td>
                    <td>{{ date('d-m-Y H:i', strtotime($order->CreatedDate)) }}</td>
                    <td>{{ $order->CustomerName ?? 'Guest' }}</td>
                    <td>{{ $order->EventName ?? '-' }}</td>
                    <td class="text-right">{{ number_format($order->TotalAmount, 0, ',', '.') }}</td>
                    <td>
                        <span class="status-badge {{ strtolower($order->PaymentStatus) === 'paid' ? 'status-paid' : 'status-pending' }}">
                            {{ strtoupper($order->PaymentStatus) }}
                        </span>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center; padding: 20px;">Tidak ada data pada periode/tipe ini.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Generated automatically by Eventix System.
    </div>

</body>
</html>
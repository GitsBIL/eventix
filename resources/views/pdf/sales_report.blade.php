<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Eventix - Executive Report</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #333; }
        .header { text-align: center; margin-bottom: 25px; border-bottom: 3px solid #0f172a; padding-bottom: 15px; }
        .header h1 { margin: 0; color: #0f172a; font-size: 24px; font-weight: 900; letter-spacing: 2px; }
        .header p { margin: 5px 0 0 0; color: #64748b; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #e2e8f0; padding: 10px 8px; text-align: left; }
        th { background-color: #0f172a; color: #ffffff; font-weight: bold; text-transform: uppercase; font-size: 10px; }
        tr:nth-child(even) { background-color: #f8fafc; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .text-danger { color: #ef4444; }
        .text-success { color: #10b981; font-weight: bold; }
        .font-bold { font-weight: bold; }
        .status-badge { font-weight: bold; padding: 4px 8px; border-radius: 4px; font-size: 9px; display: inline-block; }
        .status-paid { color: #10b981; background-color: #d1fae5; }
        .status-pending { color: #f59e0b; background-color: #fef3c7; }
        .status-failed { color: #ef4444; background-color: #fee2e2; }
        
        .summary-box { width: 45%; float: right; margin-top: 30px; border: 2px solid #0f172a; border-radius: 8px; overflow: hidden; }
        .summary-box th { background-color: #f1f5f9; color: #0f172a; font-size: 12px; }
        .summary-box td { font-size: 12px; font-weight: bold; }
        .highlight { color: #10b981; font-size: 14px; background-color: #0f172a;}
        
        .footer { clear: both; text-align: left; margin-top: 60px; font-size: 10px; color: #94a3b8; font-style: italic; border-top: 1px solid #e2e8f0; padding-top: 10px; }
    </style>
</head>
<body>

    @php
        $totalGross = 0;
        $totalFee = 0;
        $totalNet = 0;
        $totalTickets = 0;
        
        // Logika Dinamis Judul Laporan
        $reportTitle = "EXECUTIVE SALES REPORT";
        if($type === 'promoter_settlement') $reportTitle = "PROMOTER SETTLEMENT REPORT";
        if($type === 'platform_fee') $reportTitle = "PLATFORM REVENUE & FEE REPORT";
        if($type === 'all_transactions') $reportTitle = "ALL TRANSACTIONS MUTATION";
        if($type === 'failed_transactions') $reportTitle = "FAILED & PENDING TRANSACTIONS";
    @endphp

    <div class="header">
        <h1>{{ $reportTitle }}</h1>
        <p>Report Category: <strong>{{ str_replace('_', ' ', strtoupper($type)) }}</strong> | Generated: {{ date('d M Y, H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Order No</th>
                <th>Tanggal Transaksi</th>
                <th>Customer</th>
                <th>Event</th>
                <th class="text-center">Qty</th>
                <th class="text-right">Gross (Rp)</th>
                
                {{-- LOGIKA KOLOM DINAMIS BERDASARKAN TIPE LAPORAN --}}
                @if($type === 'promoter_settlement')
                    <th class="text-right">Platform Deduction (5%)</th>
                    <th class="text-right">Net to Promoter (Rp)</th>
                @elseif($type === 'platform_fee')
                    <th class="text-right">Eventix Profit (5%)</th>
                @elseif($type === 'failed_transactions')
                    {{-- Kosongin fee breakdown untuk transaksi gagal --}}
                @else
                    <th class="text-right">Eventix Fee (Rp)</th>
                    <th class="text-right">Net Promotor (Rp)</th>
                @endif
                
                <th class="text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($orders as $order)
                @php
                    $isPaid = strtolower($order->PaymentStatus) === 'paid';
                    $fee = $isPaid ? ($order->TotalAmount * 0.05) : 0;
                    $net = $isPaid ? ($order->TotalAmount - $fee) : 0;

                    if($isPaid) {
                        $totalGross += $order->TotalAmount;
                        $totalFee += $fee;
                        $totalNet += $net;
                        $totalTickets += ($order->TotalQty ?? 1);
                    }
                @endphp
                <tr>
                    <td>{{ $order->OrderNo ?? $order->ID }}</td>
                    <td>{{ date('d/m/Y H:i', strtotime($order->CreatedDate)) }}</td>
                    <td>{{ $order->CustomerName ?? 'Guest' }}</td>
                    <td>{{ $order->EventName ?? '-' }}</td>
                    <td class="text-center">{{ $order->TotalQty ?? 1 }}</td>
                    <td class="text-right">{{ number_format($order->TotalAmount, 0, ',', '.') }}</td>
                    
                    {{-- LOGIKA ISI BARIS DINAMIS BERDASARKAN TIPE LAPORAN --}}
                    @if($type === 'promoter_settlement')
                        <td class="text-right text-danger">- {{ number_format($fee, 0, ',', '.') }}</td>
                        <td class="text-right font-bold">{{ number_format($net, 0, ',', '.') }}</td>
                    @elseif($type === 'platform_fee')
                        <td class="text-right text-success">+ {{ number_format($fee, 0, ',', '.') }}</td>
                    @elseif($type === 'failed_transactions')
                        {{-- Kosongin fee breakdown untuk transaksi gagal --}}
                    @else
                        <td class="text-right" style="color: #64748b;">{{ number_format($fee, 0, ',', '.') }}</td>
                        <td class="text-right">{{ number_format($net, 0, ',', '.') }}</td>
                    @endif

                    <td class="text-center">
                        <span class="status-badge {{ $isPaid ? 'status-paid' : ($order->PaymentStatus == 'pending' ? 'status-pending' : 'status-failed') }}">
                            {{ strtoupper($order->PaymentStatus) }}
                        </span>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="9" style="text-align: center; padding: 30px; font-style: italic; color: #64748b;">Tidak ada data pada periode dan filter ini.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    {{-- REKAPITULASI KEUANGAN DINAMIS --}}
    @if(count($orders) > 0 && in_array($type, ['paid_transactions', 'promoter_settlement', 'platform_fee', 'all_transactions']))
    <table class="summary-box">
        <tr>
            <th colspan="2" style="text-align: center; font-size: 14px;">FINANCIAL SUMMARY (PAID ONLY)</th>
        </tr>
        <tr>
            <td>Total Tiket Terjual</td>
            <td class="text-right">{{ $totalTickets }} Tickets</td>
        </tr>
        <tr>
            <td>Total Pendapatan Kasar (Gross Sales)</td>
            <td class="text-right">Rp {{ number_format($totalGross, 0, ',', '.') }}</td>
        </tr>
        
        @if($type === 'promoter_settlement')
            {{-- Fokus ke Promotor --}}
            <tr>
                <td>Potongan Eventix (5%)</td>
                <td class="text-right text-danger">- Rp {{ number_format($totalFee, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td style="background-color: #0f172a; color: white;">TOTAL HAK PROMOTOR (NET)</td>
                <td class="text-right highlight" style="color: white;">Rp {{ number_format($totalNet, 0, ',', '.') }}</td>
            </tr>
        @elseif($type === 'platform_fee')
            {{-- Fokus ke Laba Eventix --}}
            <tr>
                <td>Total Tagihan Promotor</td>
                <td class="text-right text-danger">- Rp {{ number_format($totalNet, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td style="background-color: #0f172a; color: white;">TOTAL LABA EVENTIX (5% FEE)</td>
                <td class="text-right highlight" style="color: #e8ff47;">Rp {{ number_format($totalFee, 0, ',', '.') }}</td>
            </tr>
        @else
            {{-- Standard Report --}}
            <tr>
                <td>Estimasi Hak Promotor (Net)</td>
                <td class="text-right">Rp {{ number_format($totalNet, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td style="background-color: #0f172a; color: white;">TOTAL LABA EVENTIX (5% FEE)</td>
                <td class="text-right highlight" style="color: #e8ff47;">Rp {{ number_format($totalFee, 0, ',', '.') }}</td>
            </tr>
        @endif
    </table>
    @endif

    <div class="footer">
        * Laporan ini digenerate otomatis oleh sistem SaaS Eventix.<br>
        * PT. Eventix Teknologi Nusantara - Confidential Internal Report.
    </div>

</body>
</html>
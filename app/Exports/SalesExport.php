<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SalesExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $orders;

    // Menangkap data dari Controller
    public function __construct($orders)
    {
        $this->orders = $orders;
    }

    // Mengambil koleksi data
    public function collection()
    {
        return $this->orders;
    }

    // Mengatur Header (Baris pertama di Excel)
    public function headings(): array
    {
        return [
            'Order No', 
            'Tanggal Transaksi', 
            'Nama Customer', 
            'Nama Event', 
            'Total Pendapatan (Rp)', 
            'Status'
        ];
    }

    // Melakukan mapping data dari database ke baris Excel
    public function map($order): array
    {
        return [
            $order->OrderNo ?? $order->ID,
            date('d-m-Y H:i', strtotime($order->CreatedDate)),
            $order->CustomerName ?? 'Guest Customer',
            $order->EventName ?? 'General Event',
            $order->TotalAmount,
            strtoupper($order->PaymentStatus),
        ];
    }

    // Memberikan style tambahan (Header di-Bold)
    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['font' => ['bold' => true]],
        ];
    }
}
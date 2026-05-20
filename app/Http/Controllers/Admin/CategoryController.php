<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TicketCategory;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    // Fungsi khusus untuk menampilkan kategori berdasarkan ID Acara tertentu
    public function eventCategories($eventId)
    {
        $event = Event::findOrFail($eventId);
        
        $categories = DB::table('ticket_categories')
            ->where('EventID', $eventId)
            ->where('IsDeleted', 0)
            ->orderBy('ID', 'desc')
            ->get()->map(function($cat) {
                $sold = DB::table('order_items')
                            ->join('orders', 'order_items.OrderID', '=', 'orders.ID')
                            ->where('order_items.TicketCategoryID', $cat->ID)
                            ->whereIn('orders.PaymentStatus', ['paid', 'issued'])
                            ->where('order_items.IsDeleted', 0)
                            ->sum('order_items.Qty');
                
                $cat->Sold = (int) $sold;
                $cat->Progress = $cat->Quota > 0 ? min(100, round(($sold / $cat->Quota) * 100)) : 0;
                return $cat;
            });

        $stats = [
            'totalCategories' => $categories->count(),
            'activeCategories' => $categories->where('Status', 1)->count(),
            'soldOutCategories' => $categories->where('Progress', '>=', 100)->count(),
        ];

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'event' => $event, // Mengirim data acara ke halaman kategori
            'stats' => $stats
        ]);
    }

    private function cleanPriceFormat($value) {
        if (empty($value)) return 0;
        $value = (string) $value;
        if (strpos($value, ',') !== false) {
            $value = str_replace('.', '', $value);
            $value = str_replace(',', '.', $value);
        }
        $value = preg_replace('/[^0-9.]/', '', $value);
        return (float) $value;
    }

    public function store(Request $request)
    {
        $request->merge([
            'Price' => $this->cleanPriceFormat($request->Price),
            'Discount' => $this->cleanPriceFormat($request->Discount),
        ]);

        $request->validate([
            'EventID' => 'required|integer',
            'CategoryName' => 'required|string|max:100',
            'Price' => 'required|numeric',
        ]);

        TicketCategory::create([
            'EventID' => $request->EventID,
            'CategoryName' => $request->CategoryName,
            'Description' => $request->Description,
            'Price' => $request->Price,
            'Discount' => $request->Discount ?? 0,
            'Quota' => $request->Quota,
            'MaxPurchase' => $request->MaxPurchase ?? 5,
            'EntryType' => $request->EntryType,
            'Benefits' => $request->Benefits,
            'CompanyCode' => 'EVTX',
            'Status' => $request->Status ?? 1,
            'CreatedBy' => Auth::user()->FullName ?? 'System',
            'CreatedDate' => now(),
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $request->merge([
            'Price' => $this->cleanPriceFormat($request->Price),
            'Discount' => $this->cleanPriceFormat($request->Discount),
        ]);

        $request->validate([
            'CategoryName' => 'required|string|max:100',
            'Price' => 'required|numeric',
        ]);

        $cat = TicketCategory::findOrFail($id);
        $cat->update($request->all() + ['LastUpdatedBy' => Auth::user()->FullName ?? 'System', 'LastUpdatedDate' => now()]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        TicketCategory::findOrFail($id)->update(['IsDeleted' => 1]); 
        return redirect()->back();
    }
}
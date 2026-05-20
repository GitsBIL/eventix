<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('ID', 'desc')->get()->map(function ($event) {
            $names = explode(' ', trim($event->CreatedBy ?? 'System Admin'));
            $initial = count($names) >= 2
                ? strtoupper(substr($names[0], 0, 1) . substr($names[1], 0, 1))
                : strtoupper(substr($names[0], 0, 2));

            return [
                'ID' => $event->ID,
                'EventName' => $event->EventName,
                'Description' => $event->Description,
                'Location' => $event->Location,
                'EventDate' => $event->EventDate,
                'BannerImage' => $event->BannerImage,
                'Status' => $event->Status,
                'creator_initial' => $initial,
            ];
        });
        
        return Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    /**
     * Memproses kalkulasi data asli dari database untuk metrik Dashboard Acara
     */
    private function getEventStats($eventId) {
        $issuedTickets = DB::table('order_items')
            ->join('orders', 'order_items.OrderID', '=', 'orders.ID')
            ->join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->where('ticket_categories.EventID', $eventId)
            ->where('order_items.IsDeleted', 0)
            ->whereIn('orders.PaymentStatus', ['paid', 'issued'])
            ->get();

        $pendingTx = DB::table('orders')
            ->join('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->where('ticket_categories.EventID', $eventId)
            ->where('orders.PaymentStatus', 'pending_payment')
            ->distinct('orders.ID')
            ->count('orders.ID');

        $totalCapacity = DB::table('ticket_categories')
            ->where('EventID', $eventId)
            ->where('IsDeleted', 0)
            ->sum('Quota');

        return [
            'revenue' => 'Rp ' . number_format($issuedTickets->sum('SubTotal'), 0, ',', '.'),
            'tickets_sold' => (int) $issuedTickets->sum('Qty'),
            'total_capacity' => (int) $totalCapacity,
            'attendance_rate' => 0, 
            'pending_tx' => $pendingTx,
        ];
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        
        return Inertia::render('Admin/Events/Show', [
            'event' => $event,
            'stats' => $this->getEventStats($id),
            'activeTab' => 'overview'
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'EventName' => 'required|string|max:150',
            'EventDate' => 'nullable|date',
            'Location' => 'nullable|string',
            'Description' => 'nullable|string',
            'BannerImage' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'Status' => 'nullable|integer|in:0,1',
        ]);

        $path = null;
        if ($request->hasFile('BannerImage')) {
            $path = $request->file('BannerImage')->store('banners', 'public');
        }

        Event::create([
            'OrganizerID' => Auth::user()->ID ?? 1,
            'EventName' => $request->EventName,
            'Description' => $request->Description,
            'Location' => $request->Location,
            'EventDate' => $request->EventDate,
            'BannerImage' => $path,
            'CompanyCode' => 'EVTX',
            'Status' => $request->Status ?? 1,
            'IsDeleted' => 0,
            'CreatedBy' => Auth::user()->FullName ?? 'System',
            'CreatedDate' => now(),
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'EventName' => 'required|string|max:150',
            'EventDate' => 'nullable|date',
            'Location' => 'nullable|string',
            'Description' => 'nullable|string',
            'BannerImage' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'Status' => 'nullable|integer|in:0,1',
        ]);

        $event = Event::findOrFail($id);
        $path = $event->BannerImage;

        if ($request->hasFile('BannerImage')) {
            if ($event->BannerImage) {
                Storage::disk('public')->delete($event->BannerImage);
            }
            $path = $request->file('BannerImage')->store('banners', 'public');
        }

        $event->update([
            'EventName' => $request->EventName,
            'Description' => $request->Description,
            'Location' => $request->Location,
            'EventDate' => $request->EventDate,
            'BannerImage' => $path,
            'Status' => $request->Status,
            'LastUpdatedBy' => Auth::user()->FullName ?? 'System',
            'LastUpdatedDate' => now(),
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        if ($event->BannerImage) {
            Storage::disk('public')->delete($event->BannerImage);
        }
        $event->delete();
        return redirect()->back();
    }
}
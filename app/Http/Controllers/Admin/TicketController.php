<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TicketCategory;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index()
    {
        // 1. Ambil semua tiket (dengan sedikit logic dummy SOLD biar progress bar di UI kelihatan real)
        $tickets = TicketCategory::orderBy('ID', 'desc')->get()->map(function($ticket) {
            // Ini trik UI presentation: bikin angka 'Sold' secara random tapi statis berdasarkan ID
            $ticket->Sold = ($ticket->ID * 17) % max(1, $ticket->Quota); 
            return $ticket;
        });

        // 2. Ambil SEMUA event KOMPLIT (termasuk foto, tanggal, lokasi untuk SaaS Header)
        $events = Event::orderBy('ID', 'desc')->get();

        // 3. Quick Stats untuk Top Cards
        $stats = [
            'totalCategories' => $tickets->count(),
            'ticketsSoldToday' => 142, // Dummy presentation
            'pendingTransactions' => 18, // Dummy presentation
            'revenue' => 'Rp 45.2M' // Dummy presentation
        ];

        return Inertia::render('Admin/Tickets/Index', [
            'tickets' => $tickets,
            'events' => $events,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'EventID' => 'required|integer',
            'CategoryName' => 'required|string|max:50',
            'Price' => 'required|numeric',
            'Quota' => 'required|integer',
            'Status' => 'nullable|integer|in:0,1',
        ]);

        TicketCategory::create([
            'EventID' => $request->EventID,
            'CategoryName' => $request->CategoryName,
            'Price' => $request->Price,
            'Quota' => $request->Quota,
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
            'EventID' => 'required|integer',
            'CategoryName' => 'required|string|max:50',
            'Price' => 'required|numeric',
            'Quota' => 'required|integer',
            'Status' => 'nullable|integer|in:0,1',
        ]);

        $ticket = TicketCategory::findOrFail($id);

        $ticket->update([
            'EventID' => $request->EventID,
            'CategoryName' => $request->CategoryName,
            'Price' => $request->Price,
            'Quota' => $request->Quota,
            'Status' => $request->Status,
            'LastUpdatedBy' => Auth::user()->FullName ?? 'System',
            'LastUpdatedDate' => now(),
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $ticket = TicketCategory::findOrFail($id);
        $ticket->delete();
        
        return redirect()->back();
    }
}
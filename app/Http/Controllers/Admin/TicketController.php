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
        // Ambil semua tiket
        $tickets = TicketCategory::orderBy('ID', 'desc')->get();

        // Ambil SEMUA event (Aktif maupun Draft) buat jadi Induk / Kelompok di UI
        $events = Event::orderBy('ID', 'desc')->get(['ID', 'EventName', 'Status']);

        return Inertia::render('Admin/Tickets/Index', [
            'tickets' => $tickets,
            'events' => $events
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
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    public function store(Request $request)
    {
        $request->validate([
            'EventName' => 'required|string|max:150',
            'EventDate' => 'nullable|date',
            'Location' => 'nullable|string',
            'Description' => 'nullable|string',
            'BannerImage' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Validasi File Gambar
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
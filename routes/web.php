<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\TicketController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Admin\RefundController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\MidtransLogController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ReportController;

// Route Halaman Utama (Public)
Route::get('/', function () {
    $events = \App\Models\Event::where('Status', 1)->orderBy('ID', 'desc')->get()->map(function($event) {
        $lowestPrice = \App\Models\TicketCategory::where('EventID', $event->ID)
                            ->where('Status', 1)
                            ->min('Price');
        
        $priceDisplay = $lowestPrice ? 'Mulai Rp ' . number_format($lowestPrice, 0, ',', '.') : 'Tiket Belum Tersedia';

        return [
            'id' => $event->ID,
            'title' => $event->EventName,
            'date' => $event->EventDate ? date('d M Y', strtotime($event->EventDate)) : 'TBA',
            'venue' => $event->Location,
            'image' => $event->BannerImage ? '/storage/' . $event->BannerImage : 'https://images.unsplash.com/photo-1533174000220-1110a30b42f1?w=800&q=80',
            'price' => $priceDisplay,
            'tag' => 'Live Event'
        ];
    });

    return Inertia::render('WelcomePublic', [
        'publicEvents' => $events 
    ]); 
})->name('home');

// RUTE BARU: HELP CENTER (PUBLIC)
Route::get('/help-center', function () {
    return Inertia::render('HelpCenter');
})->name('help-center');

// OAuth Google
Route::get('auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

// ==================================================
// AREA USER (CUSTOMER)
// ==================================================
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();
        if ($user->Role === 'Admin' || $user->Role === 'Super Admin') {
            return redirect()->route('admin.dashboard'); 
        }
        return redirect()->route('home'); 
    })->name('dashboard');

    Route::get('/customer/dashboard', function () {
        $userId = Auth::user()->ID;

        $myTickets = \Illuminate\Support\Facades\DB::table('orders')
            ->join('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->join('events', 'ticket_categories.EventID', '=', 'events.ID')
            ->where('orders.CustomerID', $userId)
            ->select(
                'orders.ID', 'orders.OrderNo', 'orders.TotalAmount', 'orders.PaymentStatus', 'orders.CreatedDate', 
                'events.ID as EventID', 'events.EventName', 'events.Location', 'events.EventDate', 'events.BannerImage', 
                'ticket_categories.CategoryName', 'order_items.Qty'
            )
            ->orderBy('orders.CreatedDate', 'desc')
            ->get();

        $recommendedEvents = \App\Models\Event::where('IsDeleted', 0)
            ->whereDate('EventDate', '>=', now()->toDateString())
            ->orderBy('EventDate', 'asc')
            ->limit(3)
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'tickets' => $myTickets,
            'recommendedEvents' => $recommendedEvents
        ]); 
    })->name('customer.dashboard');

    Route::get('/checkout/{event_id}', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout/{event_id}', [CheckoutController::class, 'store'])->name('checkout.store');
    
    // RUTE BYPASS MIDTRANS POPUP
    Route::get('/checkout/repay/{orderNo}', [CheckoutController::class, 'repayToken'])->name('checkout.repay');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/2fa/setup', [TwoFactorController::class, 'setup'])->name('2fa.setup');
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify'])->name('2fa.verify');
});

// ==================================================
// AREA ADMIN
// ==================================================
Route::middleware(['auth', '2fa_check'])->group(function () {
    
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/analytics', [AnalyticsController::class, 'index'])->name('admin.analytics');
    
    // RUTE REPORTS & EXPORT MASTER
    Route::get('/admin/reports', [ReportController::class, 'index'])->name('admin.reports.index');
    Route::get('/admin/reports/export', [ReportController::class, 'exportCsv'])->name('admin.reports.export');
    Route::get('/admin/export-data', [ReportController::class, 'exportIndex'])->name('admin.export.index');
    Route::get('/admin/export-data/download', [ReportController::class, 'exportProcess'])->name('admin.export.download');

    // MASTER EVENT ROUTE
    Route::resource('admin/events', EventController::class)->names('admin.events');
    
    // NESTED ROUTES KHUSUS MANAGEMENT DALAM EVENT
    Route::prefix('admin/events/{event_id}')->name('admin.events.')->group(function () {
        Route::get('/categories', [CategoryController::class, 'eventCategories'])->name('categories');
        Route::get('/tickets', [TicketController::class, 'eventTickets'])->name('tickets');
    });

    Route::resource('admin/tickets', TicketController::class)->names('admin.tickets');
    Route::resource('admin/categories', CategoryController::class)->names('admin.categories');

    Route::get('/admin/transactions', [TransactionController::class, 'index'])->name('admin.transactions.index');
    Route::get('/admin/refunds', [RefundController::class, 'index'])->name('admin.refunds.index');
    
    Route::get('/admin/midtrans-logs', [MidtransLogController::class, 'index'])->name('admin.midtrans-logs.index');
    Route::get('/admin/customers', [CustomerController::class, 'index'])->name('admin.customers.index');
});

Route::get('/2fa/challenge', [TwoFactorController::class, 'challenge'])->name('2fa.challenge')->middleware('auth');
Route::post('/2fa/challenge', [TwoFactorController::class, 'authenticate'])->middleware('auth');

Route::get('/bersihin-cache-rahasia', function() {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    return 'Cache Berhasil Dibersihkan Cuy!';
});

require __DIR__.'/auth.php';
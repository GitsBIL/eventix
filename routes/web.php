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

// OAuth Google
Route::get('auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

// ==================================================
// AREA USER (CUSTOMER) - Middleware 'verified' dihapus
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
        $myTickets = \App\Models\Order::where('CustomerID', Auth::user()->ID)
            ->join('order_items', 'orders.ID', '=', 'order_items.OrderID')
            ->join('ticket_categories', 'order_items.TicketCategoryID', '=', 'ticket_categories.ID')
            ->join('events', 'ticket_categories.EventID', '=', 'events.ID')
            ->select('orders.OrderNo', 'orders.TotalAmount', 'orders.PaymentStatus','orders.CreatedDate','events.EventName','events.Location','ticket_categories.CategoryName','order_items.Qty')
            ->orderBy('orders.CreatedDate', 'desc')->get();

        return Inertia::render('Customer/Dashboard', ['tickets' => $myTickets]); 
    })->name('customer.dashboard');

    Route::get('/checkout/{event_id}', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout/{event_id}', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/2fa/setup', [TwoFactorController::class, 'setup'])->name('2fa.setup');
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify'])->name('2fa.verify');
});

// ==================================================
// AREA ADMIN - Middleware 'verified' juga dihapus
// ==================================================
Route::middleware(['auth', '2fa_check'])->group(function () {
    
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/analytics', [AnalyticsController::class, 'index'])->name('admin.analytics');
    
    // MASTER EVENT ROUTE (Secara otomatis ngebikin route admin.events.show)
    Route::resource('admin/events', EventController::class)->names('admin.events');
    
    // =========================================================================
    // SIHIR ARSITEKTUR TAHAP 1: NESTED ROUTES KHUSUS MANAGEMENT DALAM EVENT
    // =========================================================================
    Route::prefix('admin/events/{event_id}')->name('admin.events.')->group(function () {
        Route::get('/categories', [CategoryController::class, 'eventCategories'])->name('categories');
        Route::get('/tickets', [TicketController::class, 'eventTickets'])->name('tickets');
    });

    // (Rute lama dibiarin dulu biar gak ada yang error/crash mendadak)
    Route::resource('admin/tickets', TicketController::class)->names('admin.tickets');
    Route::resource('admin/categories', CategoryController::class)->names('admin.categories');

    Route::get('/admin/transactions', [TransactionController::class, 'index'])->name('admin.transactions.index');
    Route::get('/admin/refunds', [RefundController::class, 'index'])->name('admin.refunds.index');
    
    // Tambahan Rute Midtrans Logs
    Route::get('/admin/midtrans-logs', [MidtransLogController::class, 'index'])->name('admin.midtrans-logs.index');
    
    Route::get('/admin/customers', [CustomerController::class, 'index'])->name('admin.customers.index');
});

Route::get('/2fa/challenge', [TwoFactorController::class, 'challenge'])->name('2fa.challenge')->middleware('auth');
Route::post('/2fa/challenge', [TwoFactorController::class, 'authenticate'])->middleware('auth');

require __DIR__.'/auth.php';
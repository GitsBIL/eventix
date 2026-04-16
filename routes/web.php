<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\TwoFactorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// ==============================================================
// 🚪 PINTU MASUK PUBLIK (Halaman Depan / Main Menu Mewah)
// ==============================================================
Route::get('/', function () {
    return Inertia::render('WelcomePublic'); 
})->name('home');

// ==============================================================
// RUTE OAUTH GOOGLE 
// ==============================================================
Route::get('auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

// ==============================================================
// 🚦 TERMINAL TRANSIT & CUSTOMER (Bebas Masuk, Gak Pake Gembok 2FA!)
// ==============================================================
// Grup ini cuma butuh syarat Login aja ('auth'), gak perlu lewatin 2FA_check.
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Ini rute Transit yang bikin User Biasa balik ke Main Menu!
    Route::get('/dashboard', function () {
        $user = Auth::user();

        // Cek kalau dia Admin / Super Admin
        if ($user->Role === 'Admin' || $user->Role === 'Super Admin') {
            return redirect()->route('admin.dashboard'); // Lempar ke Dashboard Mewah
        }

        // Kalau dia Customer biasa, lempar balik ke halaman depan buat jajan tiket!
        return redirect()->route('home'); 
    })->name('dashboard');

    // 👤 RUTE CUSTOMER DASHBOARD (Halaman "My Tickets", Bebas 2FA)
    Route::get('/customer/dashboard', function () {
        return Inertia::render('Customer/Dashboard'); 
    })->name('customer.dashboard');

    // Setup 2FA & Profile (Semua orang boleh setup)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/2fa/setup', [TwoFactorController::class, 'setup'])->name('2fa.setup');
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify'])->name('2fa.verify');
});

// ==============================================================
// 🏰 AREA V.I.P ADMIN (Wajib Login 'auth' & Lolos Gembok '2fa_check')
// ==============================================================
Route::middleware(['auth', 'verified', '2fa_check'])->group(function () {
    
    // RUTE DASHBOARD ADMIN
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard'); 
    })->name('admin.dashboard');

});

// Rute Challenge 2FA (Pas mau masuk area VIP Admin)
Route::get('/2fa/challenge', [TwoFactorController::class, 'challenge'])->name('2fa.challenge')->middleware('auth');
Route::post('/2fa/challenge', [TwoFactorController::class, 'authenticate'])->middleware('auth');

require __DIR__.'/auth.php';
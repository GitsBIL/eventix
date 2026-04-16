<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Check2FA
{
    public function handle(Request $request, Closure $next)
    {
        // Kalau udah login + 2FA aktif + TAPI belum dicap stempel '2fa_verified' di sesi ini
        if (Auth::check() && Auth::user()->is_2fa_active && !session('2fa_verified')) {
            // Tendang ke halaman masukin kode 2FA!
            return redirect()->route('2fa.challenge');
        }

        return $next($request);
    }
}
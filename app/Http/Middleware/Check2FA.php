<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Check2FA
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->is_2fa_active && !session('2fa_verified')) {
            return redirect()->route('2fa.challenge');
        }

        return $next($request);
    }
}
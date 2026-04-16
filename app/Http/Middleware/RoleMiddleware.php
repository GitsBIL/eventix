<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        // Cek 1: User udah login belum? Kalau belum, tendang ke halaman login
        if (!Auth::check()) {
            return redirect('login');
        }

        // Cek 2: Apakah Role user sesuai dengan tiket yang diminta route?
        // Ingat, di database lu kolomnya bernama 'Role' (huruf R besar)
        if (Auth::user()->Role !== $role) {
            // Kalau rolenya beda, tendang ke halaman 403 (Tidak ada akses)
            abort(403, 'Akses Ditolak. Area ini khusus ' . $role);
        }

        return $next($request);
    }
}
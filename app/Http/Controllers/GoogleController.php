<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    // 1. Ngelempar user ke halaman login Google
    public function redirect()
    {
        return Socialite::driver('google')
            ->with(['prompt' => 'select_account']) // <--- INI BUMBUNYA CUY!
            ->redirect();
    }

    // 2. Nerima balasan dari Google pas user sukses login
    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();

        // Cek apakah email user udah ada di database kita
        $user = User::where('email', $googleUser->email)->first();

        if ($user) {
            // Kalau udah ada, update aja google_id-nya
            $user->update(['google_id' => $googleUser->id]);
        } else {
            // Kalau belum ada, bikin akun baru!
            $user = User::create([
                'FullName' => $googleUser->name, // <--- INI WAJIB FullName (Huruf F dan N besar)
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'password' => bcrypt(\Illuminate\Support\Str::random(16)),
                'Role' => 'Customer',
            ]);
        }

        // Paksa user login ke sistem kita
        Auth::login($user);

        // Arahin ke halaman dashboard
        return redirect('/dashboard');
    }
}
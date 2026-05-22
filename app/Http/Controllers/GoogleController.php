<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    // 1. Arahin user ke halaman login Google
    public function redirect()
    {
        // Gabungin stateless() dan with() dalam satu rantai return biar dieksekusi semua
        return Socialite::driver('google')
            ->stateless()
            ->with(['prompt' => 'select_account']) 
            ->redirect();
    }

    // 2. Nerima balasan dari Google pas user sukses login
    public function callback()
    {
        try {
            // TAMBAHIN stateless() DI SINI JUGA! Ini kunci anti error InvalidStateException
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Cek apakah email user udah ada di database kita
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                $user->update(['google_id' => $googleUser->id]);
            } else {
                $user = User::create([
                    'FullName' => $googleUser->name, 
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => bcrypt(Str::random(16)),
                    'Role' => 'Customer',
                ]);
            }

            Auth::login($user);

            // Arahin ke halaman dashboard setelah sukses
            return redirect('/dashboard');
            
        } catch (\Exception $e) {
            // Pengaman kalau token expire atau gagal nangkep data
            return redirect('/')->with('error', 'Gagal terhubung ke Google. Silakan coba login lagi.');
        }
    }
}
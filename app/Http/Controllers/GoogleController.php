<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')
            ->with(['prompt' => 'select_account']) 
            ->redirect();
    }

    // 2. Nerima balasan dari Google pas user sukses login
    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();

        // Cek apakah email user udah ada di database kita
        $user = User::where('email', $googleUser->email)->first();

        if ($user) {
            $user->update(['google_id' => $googleUser->id]);
        } else {
            $user = User::create([
                'FullName' => $googleUser->name, 
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'password' => bcrypt(\Illuminate\Support\Str::random(16)),
                'Role' => 'Customer',
            ]);
        }

        Auth::login($user);

        // Arahin ke halaman dashboard
        return redirect('/dashboard');
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PragmaRX\Google2FA\Google2FA;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function setup()
    {
        $user = Auth::user();
        $google2fa = new Google2FA();

        // Kalau user belum punya secret key, kita buatin baru di database
        if (!$user->google2fa_secret) {
            $user->google2fa_secret = $google2fa->generateSecretKey();
            $user->save();
        }

        // Bikin URL khusus standar Google Authenticator
        $qrCodeUrl = $google2fa->getQRCodeUrl(
            'Eventix', // Nama web lu
            $user->email, // Email user
            $user->google2fa_secret // Kunci rahasianya
        );

        // Ubah URL tadi jadi gambar QR Code (Format SVG) biar nggak pecah
        $renderer = new ImageRenderer(
            new RendererStyle(250), // Ukuran gambar QR-nya 250px
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $qrCodeSvg = $writer->writeString($qrCodeUrl);

        // Lempar gambar QR dan kode rahasianya ke layar depan (React)
        return Inertia::render('Auth/TwoFactorSetup', [
            'qrCodeSvg' => $qrCodeSvg,
            'secretKey' => $user->google2fa_secret
        ]);
    }

    // Fungsi buat ngecek 6 angka dari HP
    public function verify(Request $request)
    {
        // 1. Pastiin user beneran ngisi 6 angka
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $user = Auth::user();
        $google2fa = new Google2FA();

        // 2. Cocokin kode dari HP sama Secret Key di database
        $isValid = $google2fa->verifyKey($user->google2fa_secret, $request->code);

        if ($isValid) {
            // Kalau kodenya BENAR, aktifkan 2FA di database!
            $user->is_2fa_active = true;
            $user->save();

            // Balikin ke Dashboard
            return redirect()->route('dashboard');
        }

        // Kalau kodenya SALAH atau KADALUARSA, balikin ke halaman tadi kasih error
        return back()->withErrors(['code' => 'Kode salah atau kadaluarsa cuy! Coba angka yang baru.']);
    }

// Nampilin halaman form masukin kode pas login
    public function challenge()
    {
        return Inertia::render('Auth/TwoFactorChallenge');
    }

    // Cocokin kode pas dia mau login
    public function authenticate(Request $request)
    {
        $request->validate(['code' => 'required|string|size:6']);
        $google2fa = new Google2FA();

        if ($google2fa->verifyKey(Auth::user()->google2fa_secret, $request->code)) {
            // Kalau benar, kasih stempel LUNAS di Session!
            session(['2fa_verified' => true]); 
            
            // Cek jabatannya, lalu lempar ke ruangan masing-masing
            if (Auth::user()->Role === 'Admin') {
                return redirect()->route('admin.dashboard');
            }
            return redirect()->route('customer.dashboard');
        }

        return back()->withErrors(['code' => 'Kode salah atau kadaluarsa cuy!']);
    }
}
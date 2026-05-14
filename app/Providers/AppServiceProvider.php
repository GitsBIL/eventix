<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Paksa skema HTTPS kalau aplikasi lagi jalan di server production (cPanel)
        // Kalau jalan di localhost (XAMPP), kode ini bakal diabaikan biar gak error
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
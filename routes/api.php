<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WebhookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rute "Telinga" Webhook Midtrans
Route::post('/midtrans/webhook', [WebhookController::class, 'handle']);
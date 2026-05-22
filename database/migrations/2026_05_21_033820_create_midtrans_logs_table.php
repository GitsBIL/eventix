<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Bersihkan dulu tabel setengah jadi akibat error sebelumnya
        Schema::dropIfExists('midtrans_logs');

        // 2. Buat ulang dengan tipe data yang MATCH dengan tabel orders lu
        Schema::create('midtrans_logs', function (Blueprint $table) {
            $table->increments('ID'); // Menggunakan Integer biasa agar seragam
            
            // INI KUNCINYA: Pakai integer biasa (int 11) menyesuaikan screenshot phpMyAdmin lu
            $table->integer('OrderID'); 
            
            $table->string('EventType', 100);
            $table->string('StatusCode', 10);
            $table->json('Payload');
            $table->text('SystemAction')->nullable();
            $table->timestamp('CreatedDate')->useCurrent();

            // Deklarasi Foreign Key
            $table->foreign('OrderID')->references('ID')->on('orders')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('midtrans_logs');
    }
};
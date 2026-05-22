<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('refund_requests');

        Schema::create('refund_requests', function (Blueprint $table) {
            $table->increments('ID'); // Menggunakan Integer biasa
            
            // INI KUNCINYA: Pakai integer biasa menyesuaikan screenshot phpMyAdmin lu
            $table->integer('OrderID'); 
            
            $table->decimal('Amount', 12, 2);
            $table->text('Reason');
            $table->text('AdminNotes')->nullable();
            $table->enum('Status', ['requested', 'under_review', 'approved', 'processed', 'rejected'])->default('requested');
            
            $table->string('CreatedBy', 100)->nullable();
            $table->timestamp('CreatedDate')->useCurrent();
            $table->string('LastUpdatedBy', 100)->nullable();
            $table->timestamp('LastUpdatedDate')->nullable();

            // Deklarasi Foreign Key
            $table->foreign('OrderID')->references('ID')->on('orders')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('refund_requests');
    }
};
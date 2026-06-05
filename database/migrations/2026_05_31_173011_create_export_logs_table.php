<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('export_logs', function (Blueprint $table) {
            $table->id();
            // Nyatet siapa admin yang download
            $table->unsignedBigInteger('admin_id')->nullable(); 
            $table->string('file_name');
            $table->string('report_type');
            $table->string('format');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('export_logs');
    }
};
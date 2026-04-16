<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Kita cuma NAMBAHIN 2 kolom ke tabel users yang udah ada
        Schema::table('users', function (Blueprint $table) {
            $table->text('google2fa_secret')->nullable();
            $table->boolean('is_2fa_active')->default(false);
        });
    }

    public function down(): void
    {
        // Buat jaga-jaga kalau mau dibatalin (rollback)
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google2fa_secret', 'is_2fa_active']);
        });
    }
};
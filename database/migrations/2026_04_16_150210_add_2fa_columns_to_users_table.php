<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Pengecekan aman: Tambahkan kolom hanya JIKA belum ada di tabel users
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'google2fa_secret')) {
                $table->text('google2fa_secret')->nullable();
            }
            
            if (!Schema::hasColumn('users', 'is_2fa_active')) {
                $table->boolean('is_2fa_active')->default(false);
            }
        });
    }

    public function down(): void
    {
        // Buat jaga-jaga kalau mau dibatalin (rollback)
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'google2fa_secret')) {
                $table->dropColumn('google2fa_secret');
            }
            
            if (Schema::hasColumn('users', 'is_2fa_active')) {
                $table->dropColumn('is_2fa_active');
            }
        });
    }
};
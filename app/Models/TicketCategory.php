<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketCategory extends Model
{
    protected $table = 'ticket_categories';
    protected $primaryKey = 'ID';
    public $timestamps = false; // Matikan timestamps bawaan Laravel
    protected $guarded = []; // Izinkan semua kolom diisi
}
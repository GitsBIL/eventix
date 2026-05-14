<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Order extends Model { 
    protected $table = 'orders';
    protected $primaryKey = 'ID';
    public $timestamps = false;
    protected $guarded = [];
}
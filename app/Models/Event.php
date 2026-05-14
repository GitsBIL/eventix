<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Event extends Model {
    protected $table = 'events';
    protected $primaryKey = 'ID';
    public $timestamps = false;
    protected $guarded = [];
}
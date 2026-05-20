<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketCategory extends Model
{
    protected $table = 'ticket_categories';
    protected $primaryKey = 'ID';
    public $timestamps = false; 

    protected $fillable = [
        'EventID', 'CategoryName', 'Description', 'Price', 'Discount', 
        'Quota', 'MaxPurchase', 'EntryType', 'Benefits', 'CompanyCode', 
        'Status', 'IsDeleted', 'CreatedBy', 'CreatedDate', 
        'LastUpdatedBy', 'LastUpdatedDate'
    ];
}
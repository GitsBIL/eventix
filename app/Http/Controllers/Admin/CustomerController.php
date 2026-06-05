<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CustomerController extends Controller 
{
    public function index() 
    {
        return Inertia::render('Admin/Events/Index'); 
    }
}
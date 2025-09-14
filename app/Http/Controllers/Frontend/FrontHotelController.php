<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontHotelController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();
        return Inertia::render('frontend/hotels/index', [
            'hotels' => $hotels,
        ]);
    }
}

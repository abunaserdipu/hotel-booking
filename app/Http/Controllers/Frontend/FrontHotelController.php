<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Services\CurrencyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontHotelController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();
        return Inertia::render('frontend/hotels/index', [
            'hotels' => $hotels,
            'exchangeRates' => CurrencyService::getExchangeRates(),
            'selectedCurrency' => 'USD',
        ]);
    }
}

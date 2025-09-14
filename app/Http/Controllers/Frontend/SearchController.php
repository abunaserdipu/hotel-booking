<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Services\CurrencyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {

        // Your existing search logic using Elasticsearch
        $query = $request->input('query');
        if ($query) {
            $hotels = Hotel::search($query)->get();
        } else {
            $hotels = Hotel::all();
        }

        // Pass hotels and currency data to the frontend
        return Inertia::render('frontend/hotels/index', [
            'hotels' => $hotels,
            'exchangeRates' => CurrencyService::getExchangeRates(),
            'selectedCurrency' => 'USD', // Set a default currency
        ]);
    }
}

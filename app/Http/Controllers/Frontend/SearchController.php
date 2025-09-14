<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        if ($query) {
            $hotels = Hotel::search($query)->get();
        } else {
            $hotels = Hotel::all();
        }

        return Inertia::render('frontend/hotels/index', [
            'hotels' => $hotels,
        ]);
    }
}

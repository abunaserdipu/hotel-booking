<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('query');
        $hotels = Hotel::search($query)->get();

        return Inertia::render('Hotels/Index', [
            'hotels' => $hotels,
        ]);
    }
}

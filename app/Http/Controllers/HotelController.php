<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();
        return Inertia::render('dashboard', [
            'hotels' => $hotels,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Hotel::class);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        Hotel::create($validatedData);

        return redirect()->route('admin.hotels.index');
    }

    public function publicIndex()
    {
        $hotels = Hotel::all();
        return Inertia::render('frontend/hotels/index', [
            'hotels' => $hotels,
        ]);
    }
}

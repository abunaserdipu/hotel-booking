<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Models\Hotel;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $hotels = Hotel::all();
        return Inertia::render('dashboard/admin/hotels/index', [
            'hotels' => $hotels,
        ]);
    }

    public function create()
    {
        $this->authorize('create', Hotel::class);
        return Inertia::render('dashboard/admin/hotels/create');
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

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel created successfully.');
    }

    public function edit(Hotel $hotel)
    {
        $this->authorize('update', $hotel);
        return Inertia::render('dashboard/admin/hotels/edit', ['hotel' => $hotel]);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $this->authorize('update', $hotel);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $hotel->update($validated);

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel updated successfully.');
    }

    public function destroy(Hotel $hotel)
    {
        $this->authorize('delete', $hotel);
        $hotel->delete();

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel deleted successfully.');
    }

}

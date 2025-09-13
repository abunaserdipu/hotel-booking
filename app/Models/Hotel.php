<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Laravel\Scout\Searchable;

class Hotel extends Model
{
    use HasFactory;

    protected $casts = [
        'price' => 'float',
    ];

    protected $fillable = [
        'name',
        'location',
        'description',
        'price'
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    // public function toSearchableArray(): array
    // {
    //     return [
    //         'name' => $this->name,
    //         'location' => $this->location,
    //         'description' => $this->description,
    //     ];
    // }
}

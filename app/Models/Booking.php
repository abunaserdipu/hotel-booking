<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'booking_reference',
        'guest_name',
        'guest_email',
        'phone_number'
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}

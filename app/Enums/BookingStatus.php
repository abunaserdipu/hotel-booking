<?php

namespace App\Enums;

enum BookingStatus: string
{
    case Pending = 'pending_payment';
    case Paid = 'paid';
}

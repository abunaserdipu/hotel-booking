<?php

namespace App\Services;

class CurrencyService
{
    public static function getExchangeRates(): array
    {
        return [
            'USD' => 1.0,
            'EUR' => 0.93,
            'GBP' => 0.79,
            'JPY' => 157.0,
        ];
    }
}

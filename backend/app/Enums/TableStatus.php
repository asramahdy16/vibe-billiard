<?php

namespace App\Enums;

enum TableStatus: string
{
    case AVAILABLE = 'available';
    case BOOKED = 'booked';
    case IN_USE = 'in_use';
    case INACTIVE = 'inactive';
}

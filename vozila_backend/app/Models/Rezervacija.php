<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rezervacija extends Model
{
    use HasFactory;

    protected $table = 'rezervacije';

    protected $fillable = [
        'start_date', // Datum početka rezervacije
        'end_date',   // Datum završetka rezervacije
        'licence',
        'total_price',
        'user_id',
        'auto_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function auto()
    {
        return $this->belongsTo(Auto::class);
    }

     // da se izracuna ukupna cena rezervacije
     public function getTotalPriceAttribute()
     {
         // Dohvati automobil vezan za rezervaciju
         $auto = $this->auto;
 
         if (!$auto) {
             return null; // Ako nema vezanog automobila
         }
 
         // Izračunaj broj dana
         $startDate = \Carbon\Carbon::parse($this->start_date);
         $endDate = \Carbon\Carbon::parse($this->end_date);
         $days = $startDate->diffInDays($endDate) + 1; // Uključuje start i end dan
 
         // Izračunaj ukupnu cenu
         return $days * $auto->price_per_day;
     }
}

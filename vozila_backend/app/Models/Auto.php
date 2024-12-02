<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auto extends Model
{
    use HasFactory;

    protected $table = 'auta';

    protected $fillable = [
        'name', 
        'description',
        'price_per_day', // Cena po danu
        'kategorija_id', // Veza sa kategorijom
        
    ];

    public function rezervacije()
    {
        return $this->hasMany(Rezervacija::class);
    }

    public function kategorija()
    {
        return $this->belongsTo(Kategorija::class);
    }
}

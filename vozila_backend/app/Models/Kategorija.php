<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategorija extends Model
{
    use HasFactory;

    protected $table = 'kategorije';

    protected $fillable = [
        'name', // Naziv kategorije (npr. SUV, Sedan itd.)
        'description',
    ];

    public function automobili()
    {
        return $this->hasMany(Auto::class);
    }
}

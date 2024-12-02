<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Auto;
use App\Models\Kategorija;
use App\Models\User;

class AutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        // Dohvati sve postojeće kategorije
        $categories = Kategorija::pluck('id')->toArray();

        for ($i = 0; $i < 15; $i++) {
            Auto::factory()->create([
                'kategorija_id' => $categories[array_rand($categories)], // Nasumična kategorija
                
            ]);
        }
    
    }
}

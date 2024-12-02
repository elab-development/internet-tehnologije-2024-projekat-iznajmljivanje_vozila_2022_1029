<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kategorija;

class KategorijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'SUV',
            'Sedan',
            'Hatchback',
            'Coupe',
            'Convertible',
            'Pickup Truck',
            'Van',
            'Minivan',
            'Wagon',
            'Sports Car'
        ];
    
        foreach ($categories as $category) {
            Kategorija::factory()->create([
                'name' => $category,
                'description' => $category . ' - ' . fake()->sentence(6), 
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Rezervacija;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RezervacijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rezervacija::factory(10)->create();
    }
}

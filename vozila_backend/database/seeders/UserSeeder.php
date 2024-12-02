<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kreiranje admin korisnika
        User::factory()->create([
            'name' => 'Admin Sajta',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'is_admin' => true, 
        ]);

        // Kreiranje 9 običnih korisnika
        User::factory(9)->create();
    }
}

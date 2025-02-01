<?php

namespace Database\Factories;

use App\Models\Auto;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rezervacija>
 */
class RezervacijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         // Generiši slučajne datume početka i kraja rezervacije
         $startDate = $this->faker->dateTimeBetween('-1 month', '+1 week');
         $endDate = $this->faker->dateTimeBetween($startDate, '+1 week');
 
         // Izaberi nasumičan automobil i dohvati njegovu cenu po danu
         $auto = Auto::inRandomOrder()->first();
         $days = $startDate->diff($endDate)->days + 1; // Uključuje start i end dan
         $totalPrice = $days * $auto->price_per_day;
 
         // Dohvati nasumičnog korisnika osim admina (ID > 1)
         $user = User::where('id', '>', 1)->inRandomOrder()->first();

          // Generiši putanju za lažnu sliku
        $licenceImagePath = $this->faker->image(
            Storage::path('public/licences'), // Lokacija gde se čuvaju slike
            640, // Širina slike
            480, // Visina slike
            null, // Kategorija slike
            false // Čuvanje samo imena fajla, bez pune putanje
        );
 
         return [
             'start_date' => $startDate,
             'end_date' => $endDate,
             'licence' => 'licences/' . $licenceImagePath,
             'total_price' => $totalPrice,
             'user_id' => $user->id,
             'auto_id' => $auto->id,
         ];
    }
}

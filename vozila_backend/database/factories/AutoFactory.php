<?php

namespace Database\Factories;

use App\Models\Kategorija;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Auto>
 */
class AutoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $car = (new \Faker\Factory())::create();
        $car->addProvider(new \Faker\Provider\Fakecar($car));
        $carName = $car->vehicle;


        return [
            'name' => $carName,
            'description' => $carName . ' is the ' . $this->faker->word(),
            'price_per_day' => $this->faker->numberBetween($min = 50, $max = 300),
            'kategorija_id' => Kategorija::factory(),


        ];
    }
}

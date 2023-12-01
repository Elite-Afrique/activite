<?php

namespace Database\Seeders;

use App\Models\Activite;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ActiviteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        for($i = 0; $i <= 9; $i ++) {
            Activite::create([
                'libelleactivite' => $faker->sentence($nbWords = 6, $variableNbWords = true),
            ]);
        }
    }
}

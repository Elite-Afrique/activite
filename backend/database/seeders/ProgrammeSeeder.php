<?php

namespace Database\Seeders;

use App\Models\Activite;
use App\Models\Programme;
use App\Models\Titreprogramme;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ProgrammeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $startDate = '2023-10-02';
        $endDate = '2023-10-09';
        for($i = 0; $i <= 50; $i ++) {
            Programme::create([
                'user_id' => $this->getRandomUser(),
                'titre_id' => $this->getRandomTitreProg(),
                'activite_id' => $this->getRandomActivite(),
                'date' => $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d'),
                'created_at' => $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d'),
                'updated_at' => $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d'),
                // 'statut' => rand(0, 1),
                'statut' => 0,
                'halfstatut' => 0,
                'activite_sup' => 0,
            ]);
        }
    }

    private function getRandomUser() {
        $user = User::inRandomOrder()->first();
        return $user->id;
    }

    private function getRandomTitreProg() {
        $titreprogramme = Titreprogramme::inRandomOrder()->first();
        return $titreprogramme->id;
    }

    private function getRandomActivite() {
        $activite = Activite::inRandomOrder()->first();
        return $activite->id;
    }
}

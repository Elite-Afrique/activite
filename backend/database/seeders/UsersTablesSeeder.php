<?php
namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
// use App\User;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            ['nom' => 'Nana', 'prenom' => 'Abdoul','statut' => 1,'role_id' => $this->getRandomRole(),'numero' => '75632972','email' => 'abdoul@gmail.com','password' => Hash::make('password')],
            ['nom' => 'Ilboudo', 'prenom' => 'Martin','statut' => 1,'role_id' => $this->getRandomRole(),'numero' => '75632972','email' => 'martin@gmail.com','password' => Hash::make('password')],
            ['nom' => 'Nana', 'prenom' => 'Faycal','statut' => 1,'role_id' => $this->getRandomRole(),'numero' => '75632972','email' => 'faycalnana1@gmail.com','password' => Hash::make('password')],
        ];
        foreach ($user as $key => $value){
            User::create([
                'nom' => $value['nom'],
                'prenom' => $value['prenom'],
                'statut' => $value['statut'],
                'role_id' => $value['role_id'],
                'numero' => $value['numero'],
                'email' => $value['email'],
                'password' => $value['password'],
            ]);
        }

        // User::create([
        //     'nom'    => 'Nana',
        //     'prenom'    => 'Abdoul',
        //     'statut'    => 1,
        //     'role_id'    => $this->getRandomRole(),
        //     'numero'    => '75632972',
        //     'email'    => 'faycalnana1@gmail.com',
        //     'password'   =>  Hash::make('password'),
        // ]);
    }

    private function getRandomRole() {
        $role = Role::inRandomOrder()->first();
        return $role->id;
    }
}
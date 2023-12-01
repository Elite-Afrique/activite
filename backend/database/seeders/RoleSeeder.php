<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = [
            ['libellerole' => 'Admin', 'niveau' => 1],
            ['libellerole' => 'Manager Général 	', 'niveau' => 2],
            ['libellerole' => 'Employé', 'niveau' => 3]
        ];
        foreach ($role as $key => $value){
            Role::create([
                'libellerole' => $value['libellerole'],
                'niveau' => $value['niveau']
            ]);
        }

        // Role::create([
        //     'libellerole'    => 'Admin',
        //     'niveau'    => 1
        // ]);
    }
}

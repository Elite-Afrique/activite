<?php

namespace Database\Seeders;

use App\Models\Titreprogramme;
use Illuminate\Database\Seeder;

class TitreprogrammeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        setlocale(LC_TIME, 'fr_FR.UTF8');
        $annee = date("Y");
        $no_semaine = date("W");
        $prev_no_semaine = date("W")-1;
        if(date("w") == 6 || date("w") == 0){
            $no_semaine = date("W")+1;
            $prev_no_semaine = date("W");
        }
        // Récup jour début et fin de la semaine
        $timeStart = strtotime("First Monday January {$annee} + ".($no_semaine - 1)." Week");
        $timeEnd   = strtotime("First Monday January {$annee} + {$no_semaine} Week -1 day");
        // Récup jour début et fin de la semaine précédente
        $prev_timeStart = strtotime("First Monday January {$annee} + ".($prev_no_semaine - 1)." Week");
        $prev_timeEnd   = strtotime("First Monday January {$annee} + {$prev_no_semaine} Week -1 day");
        
        // Récup année et mois début
        $anneeStart = date("Y", $timeStart);
        $anneeEnd   = date("Y", $timeEnd);
        $moisStart  = date("m", $timeStart);
        $moisEnd    = date("m", $timeEnd);

        // Gestion des différents cas de figure
        if( $anneeStart != $anneeEnd ){
            // à cheval entre 2 années
            $retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d %B %Y", $timeStart)." au ".strftime("%d %B %Y", $timeEnd);
            $prev_retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d %B %Y", $prev_timeStart)." au ".strftime("%d %B %Y", $prev_timeEnd);
        } elseif( $moisStart != $moisEnd ){
            // à cheval entre 2 mois
            $retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d %B", $timeStart)." au ".strftime("%d %B %Y", $timeEnd);
            $prev_retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d %B", $prev_timeStart)." au ".strftime("%d %B %Y", $prev_timeEnd);
        } else {
            // même mois
            $retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d", $timeStart)." au ".strftime("%d %B %Y", $timeEnd);
            $prev_retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d", $prev_timeStart)." au ".strftime("%d %B %Y", $prev_timeEnd);
        }

        $titre = [
            ['titreprogramme' => $prev_retour, 'progress' => 0],
            ['titreprogramme' => $retour, 'progress' => 0],
        ];
        foreach ($titre as $key => $value){
            Titreprogramme::create([
                'titreprogramme' => $value['titreprogramme'],
                'progress' => $value['progress'],
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Programme;
use App\Models\Activite;
use App\Models\Titreprogramme;
use App\Models\Executionjours;
use App\Models\Rapportsjours;
use App\Models\besoins;
use App\Models\Documents;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Carbon\Carbon;

class ProgramController extends Controller
{
/*********************** START GESTION DES ACTIVITES *******************/
    public function createactivite(Request $req){
        $error=0;
        $verif_activite = DB::table('activites')->where('libelleactivite',$req->libelleactivite)->get();
        $res = json_decode($verif_activite,true);
        if(sizeof($res) === 0)
        {
        $activite= Activite::create($req->all());
        return response()->json($activite->id);
        }
        else
        {
            return response()->json($verif_activite[0]->id);
        }
    }

    public function getactivite(){
        $activites = DB::table('activites')->get();
        return response()->json($activites,200);
    }

    public function getActNbrByUser($id){
        $nbr = Programme::where('user_id',$id)->count();
        return response()->json($nbr,200);
    }
/*********************** END GESTION DES ACTIVITES *******************/

/*********************** START GESTION DES PROGRAMMES *******************/
    public function createprogramme(Request $req){

        $programme= Programme::create($req->all());
        return response()->json($programme,200);
    }

    public function updateprogramme(Request $req){
        $verif_activite = DB::table('activites')->where('libelleactivite',$req->activite_id)->get();
        $res = json_decode($verif_activite,true);
        if(sizeof($res) === 0)
        {
        $activite= Activite::create([
            'libelleactivite' => $req->activite_id,
            ]
        );
        $activite_id = $activite->id;
        }
        else
        {
            $activite_id = $verif_activite[0]->id;
        }

        // dd($req);
        $program = Programme::where('id',$req->id)->update(
            [
                'user_id' => $req->userid,
                'activite_id' => $activite_id,
                'date' => $req->date,
            ]
        );
        $programmes = Programme::where('id',$req->id)->first();
        return response()->json($programmes,200);
    }

    public function getprogramme($id){
        $programmes = Programme::join('users', 'users.id', '=', 'programmes.user_id')
                                ->join('activites', 'activites.id', '=', 'programmes.activite_id')
                                ->join('titreprogrammes', 'titreprogrammes.id', '=', 'programmes.titre_id')
                                ->where('titre_id',$id)
                                ->orderBy('user_id')
                                ->get(['programmes.*','users.nom','users.prenom','activites.libelleactivite','titreprogrammes.titreprogramme']);
        if($programmes != null){
            return response()->json($programmes,200);
        }else{
            return response()->json(0,200);
        }

    }

    public function getUserprogramme(){
        $titreprogrammes = Titreprogramme::orderBy('id','DESC')->first();
        $programmes = Programme::join('users', 'users.id', '=', 'programmes.user_id')
                                ->join('activites', 'activites.id', '=', 'programmes.activite_id')
                                ->join('titreprogrammes', 'titreprogrammes.id', '=', 'programmes.titre_id')
                                ->where('titre_id',$titreprogrammes->id)
                                ->orderBy('user_id')
                                ->get(['programmes.*','users.nom','users.prenom','activites.libelleactivite','titreprogrammes.titreprogramme']);
        if($programmes != null){
            return response()->json($programmes,200);
        }else{
            return response()->json(0,200);
        }

    }

    public function getprogramactbyid($id){
        $programmes = Programme::where('programmes.id',$id)
                                ->join('activites', 'activites.id', '=', 'programmes.activite_id')
                                ->get(['programmes.*','activites.libelleactivite']);
        return response()->json($programmes[0],200);
    }

    public function getProgrammeProgress($id){
        $nbr = Programme::where('titre_id',$id)->count();
        $nbr1 = Programme::where('titre_id', $id)->where('statut',1)->count();
        $nbr3 = Programme::where('titre_id', $id)->where('halfstatut',1)->count();
        $nbr0 = $nbr3/2;
        $nbr2 = round((($nbr1+$nbr0)*100)/$nbr,2);
        $progressupdate = Titreprogramme::where('id',$id)->update(['progress' => $nbr2]);
        return response()->json($nbr2,200);
    }

    public function getActualProgrammeProgress(){
        $titreprogrammes = Titreprogramme::orderBy('id','DESC')->first();
        $nbr = Programme::where('titre_id',$titreprogrammes->id)->count();
        $nbr1 = Programme::where('titre_id', $titreprogrammes->id)->where('statut',1)->count();
        $nbr3 = Programme::where('titre_id', $titreprogrammes->id)->where('halfstatut',1)->count();
        $nbr0 = $nbr3/2;
        $nbr2 = round((($nbr1+$nbr0)*100)/$nbr,2);
        $progressupdate = Titreprogramme::where('id',$titreprogrammes->id)->update(['progress' => $nbr2]);
        return response()->json($nbr2,200);
    }

    public function getallWeekDays(){
        // START GET WEEK DAYS
        $annee = date("Y");
        $no_semaine = date("W");
        for($i = 1; $i <= 365; $i++) {
            $week = date("W", mktime(0, 0, 0, 1, $i, $annee));
            if($week == $no_semaine) {
                for($d = 0; $d < 7; $d++) {
                    $nbr2[] = date("d/m/Y", mktime(0, 0, 0, 1, $i+$d, $annee));
                }
                break;
            }
        }
        return response()->json($nbr2,200);
        // END GET WEEK DAYS
    }

    public function getdaylyprogrammeprogresss(){
        $datejrs = date('Y-m-d');
        $titreprogrammes = Titreprogramme::orderBy('id','DESC')->first();
        if($titreprogrammes != null){
            // START CALCUL TAUX
            $nbr = Programme::where('titre_id',$titreprogrammes->id)->count();
            $nbr1 = Programme::where('titre_id', $titreprogrammes->id)->where('statut',1)->whereDate('updated_at',$datejrs)->count();
            $nbr3 = Programme::where('titre_id', $titreprogrammes->id)->where('halfstatut',1)->whereDate('updated_at',$datejrs)->count();
            $nbr0 = $nbr3/2;
            $taux = round((($nbr1+$nbr0)*100)/$nbr,2);
            // END CALCUL TAUX
            if($taux != null){
                // START UPDATE TAUX IN DATA BASE
                $verif_taux = Executionjours::whereDate('created_at',$datejrs)->get();
                $res = json_decode($verif_taux,true);

                if(sizeof($res) === 0)
                {
                    $create_new_taux= Executionjours::create(
                        [ 
                            'titreprogramme_id' => $titreprogrammes->id,
                            'taux' => $taux,
                        ]
                    );
                    $update_taux=Executionjours::where('id',$create_new_taux->id)
                    ->update(['taux' => $taux,]);
                    return response()->json($taux);
                }
                else
                {
                    $update_taux=Executionjours::where('id',$verif_taux[0]->id)
                    ->update(['taux' => $taux,]);
                    return response()->json($taux);
                }
                // END UPDATE TAUX IN DATA BASE
            }
        }
        else{
            return response()->json(0,200);
        }

    }

    public function getactualweekdatas(){
        $annee = date("Y");
        $no_semaine = date("W");
        $numb = date("w");
        
        for($i = 1; $i <= 365; $i++) {
            $week = date("W", mktime(0, 0, 0, 1, $i, $annee));
            if($week == $no_semaine) {
                for($d = 0; $d < 7; $d++) {
                    $nbr2[$d] = date("Y-m-d", mktime(0, 0, 0, 1, $i+$d, $annee));
                }
                if($numb == 0){
                    $numb = 7;
                }
                for($x = 0; $x < $numb; $x++) {
                    $datas0 = Executionjours::whereDate('updated_at',$nbr2[$x])->get('taux');
                    $res = json_decode($datas0,true);
                    if(sizeof($res) === 0){
                        $datas[$x] = 0;
                    }else{
                        $datas[$x] = $datas0[0]->taux;
                    }
                }
                break;
            }
        }
        return response()->json($datas,200);
    }

    public function getlastweekdatas(){
        $annee = date("Y");
        $no_semaine = date("W")-1;
        for($i = 1; $i <= 365; $i++) {
            $week = date("W", mktime(0, 0, 0, 1, $i, $annee));
            if($week == $no_semaine) {
                for($d = 0; $d < 7; $d++) {
                    $nbr2[$d] = date("Y-m-d", mktime(0, 0, 0, 1, $i+$d, $annee));
                }

                for($x = 0; $x < 7; $x++) {
                    $datas0 = Executionjours::whereDate('updated_at',$nbr2[$x])->get('taux');
                    $res = json_decode($datas0,true);
                    if(sizeof($res) === 0){
                        $datas[$x] = 0;
                    }else{
                        $datas[$x] = $datas0[0]->taux;
                    }
                }
                break;
            }
        }
        return response()->json($datas,200);
    }

    public function validActivite($id){
        $program = Programme::where('id',$id)->update(['statut' => 1]);
        return response()->json($program,200);
    }

    public function validhalfActivite($id){
        $program = Programme::where('id',$id)->update(['halfstatut' => 1]);
        return response()->json($program,200);
    }

    public function getprogrammeByUser($id){
        $programmes = Programme::where('titre_id',$id)->get();
        return response()->json($programmes,200);
    }

    public function getAllprogramme(){
        $programmes = Titreprogramme::orderBy('id', 'DESC')->get();
        return response()->json($programmes,200);
    }

    public function delprogramme($id){
        $titre_id = Programme::where('id',$id)->get('titre_id');
        Programme::destroy($id);
        return response()->json($titre_id[0],200);
    }
/*********************** END GESTION DES PROGRAMMES *******************/

/*********************** START GESTION DES TITRES DE PROGRAMMES *******************/
    function getweek(){
        setlocale(LC_TIME, 'fr_FR.UTF8');
        $annee = date("Y");
        $no_semaine = date("W");
        if(date("w") == 6 || date("w") == 0){
            $no_semaine = date("W")+1;
        }
        // Récup jour début et fin de la semaine
        $timeStart = strtotime("First Monday January {$annee} + ".($no_semaine - 1)." Week");
        $timeEnd   = strtotime("First Monday January {$annee} + {$no_semaine} Week -1 day");
        
        // Récup année et mois début
        $anneeStart = date("Y", $timeStart);
        $anneeEnd   = date("Y", $timeEnd);
        $moisStart  = date("m", $timeStart);
        $moisEnd    = date("m", $timeEnd);
        
        // Gestion des différents cas de figure
        if( $anneeStart != $anneeEnd ){
            // à cheval entre 2 années
            $retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d %B %Y", $timeStart)." au ".strftime("%d %B %Y", $timeEnd);
        } elseif( $moisStart != $moisEnd ){
            // à cheval entre 2 mois
            $retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d %B", $timeStart)." au ".strftime("%d %B %Y", $timeEnd);
        } else {
            // même mois
            $retour = "PROGRAMME DE LA SEMAINE : ".strftime("%d", $timeStart)." au ".strftime("%d %B %Y", $timeEnd);
        }
        // return $retour;
        return response()->json($retour,200);
    }

    public function createtitreprogramme(Request $req){
        $error=0;
        $titre_id = 0;
        $verif_programme = Titreprogramme::where('titreprogramme',$req->titreprogramme)->get();
        $res = json_decode($verif_programme,true);

        if(sizeof($res) === 0)
        {
            $titreprogramme= Titreprogramme::create($req->all());
            return response()->json($titreprogramme->id);
        }
        else
        {
            return response()->json($verif_programme[0]->id);
        }
    }

    public function getAllTitreprogramme(){
        $ttitreprogrammes = Titreprogramme::orderBy('id','DESC')->get();
        return response()->json($ttitreprogrammes,200);
    }
/*********************** END GESTION DES TITRES DE PROGRAMMES *******************/

/*********************** START GESTION DES RAPPORTS D'ACTIVITES *******************/
    public function addrapport(Request $req){
        $rap= Rapportsjours::create($req->all());
        return response()->json($rap,200);
    }

    public function getrapport(){
        $rap = Rapportsjours::join('users', 'users.id', '=', 'rapportsjours.usr_id')
                            ->join('programmes', 'programmes.id', '=', 'rapportsjours.prog_id')
                            ->join('activites', 'activites.id', '=', 'programmes.activite_id')
                            ->orderBy('id','DESC')
                            ->get(['rapportsjours.*','users.nom','users.prenom','activites.libelleactivite']);
        return response()->json($rap,200);
    }

    public function updaterapport(Request $req){
        $rap=Rapportsjours::where('id',$req->id)->update(['body' => $req->body,]);
        return response()->json($rap);
    }

    public function getrapportbyid($id){
        $rap = Rapportsjours::where('id',$id)->get();
        return response()->json($rap,200);
    }

    public function delrapport($id){
        return Rapportsjours::destroy($id);
    }
/*********************** END GESTION DES RAPPORTS D'ACTIVITES *******************/

/*********************** START GESTION DES BESOINS *******************/
    public function addbesoins(Request $req){
        $rap= besoins::create($req->all());
        return response()->json($rap,200);
    }

    public function getbesoins(){
        $rap = besoins::join('users', 'users.id', '=', 'besoins.user_id')
                        ->orderBy('id','DESC')
                        ->get(['besoins.*','users.nom','users.prenom']);
        return response()->json($rap,200);
    }

    public function validbesoins($id){
        $rap=besoins::where('id',$id)->update(['validstatut' => 1]);
        return response()->json($rap);
    }

    public function rejetbesoins($id){
        $rap=besoins::where('id',$id)->update(['rejetstatut' => 1]);
        return response()->json($rap);
    }

    public function executbesoins(Request $req){
        $rap=besoins::where('id',$req->id)->update(['executstatut' => 1]);
        return response()->json($rap);
    }

    public function delbesoin($id){
        return besoins::destroy($id);
    }
/*********************** END GESTION DES BESOINS *******************/

/*********************** START GESTION DES DOCUMENTS *******************/
    public function adddocs(Request $req){
        $rap= Documents::create($req->all());
        return response()->json($rap,200);
    }

    public function getdocs(){
        $rap = Documents::join('users', 'users.id', '=', 'documents.createdBy')
                        ->orderBy('id','DESC')
                        ->get(['documents.*','users.nom','users.prenom']);
        return response()->json($rap,200);
    }

    public function deldocs($id){
        return besoins::destroy($id);
    }
}
/*********************** END GESTION DES DOCUMENTS *******************/
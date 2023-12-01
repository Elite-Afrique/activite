<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use App\Models\User;
use App\Notifications\UserNotification;
use Illuminate\Support\Facades\Hash;

class LoginRegistController extends Controller
{
    //Creation d'un utilisateur
    public function registerUser(Request $req){

        $result = DB::table('users')->where([['email', $req->email],])->get();
        $res = json_decode($result,true);
        if(sizeof($res) === 0){
            // $user= User::create($req->all());
            $password = bin2hex(random_bytes(4));
            $user = User::create([
                'nom' => $req->nom,
                'prenom' => $req->prenom,
                'email' => $req->email,
                'role_id' => $req->role_id,
                'numero' => $req->numero,
                'statut' => $req->statut,
                'password' => Hash::make($password),
            ]);
            try {
            $user->notify(new UserNotification($user, $password));
            } catch (\Throwable $th) {
                throw $th;
            }
            return response()->json($user,200);
        }
        else{
            return response()->json(sizeof($res));
        }
    }

    //Connexion
    function login(Request $req){
        $result = User::where([['email', $req->email]])
        ->join('roles', 'users.role_id', '=', 'roles.id')
        ->get(['users.*', 'roles.libellerole', 'roles.niveau']);
        
        $res = json_decode($result,true);
        if(sizeof($res) === 0){
            return response()->json(sizeof($res));
        }
        else{
            if (Hash::check($req->password, $result[0]->password)) {
                return response()->json($result[0]);
            } else {
                return response()->json(0);
            }
        }

        // $user = User::where('email', $req->email)->first();

        // if ($user) {
        //     if (Hash::check($req->password, $user->password)) {
        //         return response()->json($user);
        //     } else {
        //         return response()->json(0);
        //     }
        // } else {
        //     return null;
        // }
    }

    //Retrouver un utilisateur par email
    public function getUser($email){
        $data = User::where('email',$email)->first();
        //$data= User::all();
        return response()->json($data);
      }

    public function getuserbyid($id)
    {
        $user= User::where('id',$id)->first();
        return response()->json($user);
    }

    //Liste des utilisateurs
    public function getAllUser(){

        $users = User::join('roles', 'users.role_id', '=', 'roles.id')
            ->get(['users.*', 'roles.libellerole', 'roles.niveau']);
        return response()->json($users,200);
    }

    //Modifier Profile
    public function UpdateProfile(Request $req){

        $user = User::where('id',$req->id)->update(
            [
                'nom' => $req->nom,
                'prenom' => $req->prenom,
                'email' => $req->email,
                'role_id' => $req->role_id,
                'numero' => $req->numero,
            ]
        );
        $result=User::where('id',$req->id)->first();
        return response()->json($result, 200);
    }

    //Recuperer Mot de passe
    public function RecupPassword(){
        
    }

    public function updateUser(Request $req){
        $user=User::where('id',$req->user_id)
        ->update(
            [ 
                'nom' => $req->nom,
                'prenom' => $req->prenom,
                'email' => $req->email,
                // 'role_id' => $req->role_id,
                'numero' => $req->numero
            ]
        );
        $result=User::where('id',$req->user_id)->first();
        return response()->json($result, 200);
    }

    public function delUser($id){
        return User::destroy($id);
    }


}

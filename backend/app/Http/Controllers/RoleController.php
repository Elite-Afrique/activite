<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use App\Models\Role;

class RoleController extends Controller
{
    public function createRole(Request $req){
        $error=0;
        $verif_role = DB::table('roles')->where('libellerole',$req->libellerole)->get();
        $res = json_decode($verif_role,true);
        if(sizeof($res) === 0)
        {
        $role= Role::create($req->all());
        return response()->json($role,200);
        }
        else
        {
            return response()->json($error, 200);
        }
    }

    public function getrole(){
        $role = DB::table('roles')->get();
        return response()->json($role,200);
    }
}

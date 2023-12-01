<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\commentaire;

class CommentController extends Controller
{
    public function comment(Request $req)
    {
        $data = $req->input();
        $comment = new commentaire();

        $comment->user_id = $data['userid'];
        $comment->pat_id = $data['patid'];
        $comment->parent_id = $data['parentid'];
        $comment->comment = $data['comment'];

        $comment->save();
        return response()->json($comment, 200 );
    }

    public function getprimarycomment($id){
        $comments1 = DB::table('commentaires')->where('pat_id',$id)->get();
        return response()->json($comments1);
    }

    public function getsecondarycomment($id){
        $comments2 = DB::table('commentaires')->where('parent_id',$id)->get();
        return response()->json($comments2);
    }
}

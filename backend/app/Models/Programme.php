<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Programme extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    //public $timestamps=false;
    protected $fillable = [
        'titre_id',
        'user_id',
        'activite_id',
        'date',
        'statut',
        'halfstatut',
        'activite_sup',
    ];
}

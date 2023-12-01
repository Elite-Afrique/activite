<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class besoins extends Model
{
    use HasFactory;
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    //public $timestamps=false;
    protected $fillable = [
        'user_id',
        'body',
        'validstatut',
        'rejetstatut',
        'executstatut',
    ];
}

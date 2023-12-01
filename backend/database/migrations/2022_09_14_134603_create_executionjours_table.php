<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExecutionjoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('executionjours', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('titreprogramme_id');
            $table->foreign('titreprogramme_id')
                ->references('id')
                ->on('titreprogrammes')
                ->onDelete('restrict')
                ->onUpdate('restrict');
            $table->Double('taux');;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('executionjours');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('missions', function (Blueprint $table) {
            $table->dropColumn('statut');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('missions', function (Blueprint $table) {
            $table->string('statut')->nullable();
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('missions', function (Blueprint $table) {
            // Remplace 'ancien_nom' par le nom actuel dans ta BDD (ex: type_vehicule_id ou autre)
            $table->renameColumn('type_vihicule', 'type_vehicule');
        });
    }

    public function down(): void
    {
        Schema::table('missions', function (Blueprint $table) {
            $table->renameColumn('type_vehicule', 'type_vihicule');
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id(); // Clé primaire : id

            $table->string('immatriculation')->unique();
            $table->string('marque');
            $table->string('modele');
            $table->integer('kilometrage');
            $table->enum('statut', [
                'disponible',
                'en_mission',
                'en_maintenance',
                'hors_service'
            ])->default('disponible');

            $table->integer('capacite')->nullable();
            $table->string('type_carburant')->nullable();
            $table->string('categorie')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};

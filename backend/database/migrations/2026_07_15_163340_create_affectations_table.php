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
        Schema::create('affectations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('voiture_id')
                  ->constrained('voitures')
                  ->cascadeOnDelete();

            $table->foreignId('mission_id')
                  ->constrained('missions')
                  ->cascadeOnDelete();

            $table->foreignId('employee_id')
                  ->nullable()
                  ->constrained('employees')
                  ->nullOnDelete();

            $table->foreignId('cree_par')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->date('date_debut');
            $table->date('date_fin')->nullable();

            $table->integer('kilometrage_debut')->nullable();
            $table->integer('kilometrage_fin')->nullable();

            $table->enum('statut', [
                'active',
                'terminee',
                'annulee'
            ])->default('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affectations');
    }
};

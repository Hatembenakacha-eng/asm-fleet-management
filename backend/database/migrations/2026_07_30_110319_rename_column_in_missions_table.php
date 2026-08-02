<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('missions', 'type_vihicule') && !Schema::hasColumn('missions', 'type_vehicule')) {
            Schema::table('missions', function (Blueprint $table) {
                $table->renameColumn('type_vihicule', 'type_vehicule');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('missions', 'type_vehicule') && !Schema::hasColumn('missions', 'type_vihicule')) {
            Schema::table('missions', function (Blueprint $table) {
                $table->renameColumn('type_vehicule', 'type_vihicule');
            });
        }
    }
};

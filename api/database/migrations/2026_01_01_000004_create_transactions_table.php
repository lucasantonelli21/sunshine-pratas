<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('description', 200);
            $table->decimal('amount', 10, 2);
            $table->date('date');
            $table->string('type', 20);
            $table->string('status', 20)->default('pending');
            $table->string('payment_method', 30)->nullable();
            $table->string('category', 100)->nullable();
            $table->string('notes', 500)->nullable();
            $table->foreignUuid('user_id')->constrained()->restrictOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};

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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code')->unique()->comment('Unique transaction identifier');
            $table->foreignId('user_id')->constrained();
            $table->decimal('total_amount', 12, 2)->comment('Total transaction amount');
            $table->decimal('total_profit', 12, 2)->comment('Total profit from transaction');
            $table->json('items')->comment('Transaction items as JSON');
            $table->enum('status', ['completed', 'cancelled', 'pending'])->default('completed')->comment('Transaction status');
            $table->timestamps();
            
            $table->index('transaction_code');
            $table->index('user_id');
            $table->index(['created_at', 'status']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
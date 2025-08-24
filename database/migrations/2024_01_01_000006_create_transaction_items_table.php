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
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained();
            $table->string('product_name')->comment('Product name at time of sale');
            $table->string('product_sku')->comment('Product SKU at time of sale');
            $table->integer('quantity')->comment('Quantity sold');
            $table->decimal('unit_price', 10, 2)->comment('Price per unit at time of sale');
            $table->decimal('total_price', 10, 2)->comment('Total price for this item');
            $table->decimal('unit_profit', 10, 2)->comment('Profit per unit');
            $table->decimal('total_profit', 10, 2)->comment('Total profit for this item');
            $table->boolean('used_fixed_price')->default(false)->comment('Whether fixed price was used');
            $table->timestamps();
            
            $table->index('transaction_id');
            $table->index('product_id');
            $table->index(['product_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};
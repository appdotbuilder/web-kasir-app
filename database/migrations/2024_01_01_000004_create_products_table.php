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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->string('sku')->unique()->comment('Stock Keeping Unit');
            $table->foreignId('category_id')->constrained();
            $table->decimal('buy_price', 10, 2)->comment('Purchase price');
            $table->decimal('sell_price', 10, 2)->comment('Regular selling price');
            $table->decimal('fixed_price', 10, 2)->nullable()->comment('Harga pas - fixed selling price');
            $table->integer('current_stock')->default(0)->comment('Current stock quantity');
            $table->integer('minimum_stock')->default(0)->comment('Minimum stock level for alerts');
            $table->string('unit_of_measure')->default('pcs')->comment('Unit of measure (pcs, box, etc.)');
            $table->text('description')->nullable()->comment('Product description');
            $table->string('image_path')->nullable()->comment('Product image path');
            $table->boolean('is_active')->default(true)->comment('Product status');
            $table->timestamps();
            
            $table->index(['name', 'sku']);
            $table->index('category_id');
            $table->index(['current_stock', 'minimum_stock']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
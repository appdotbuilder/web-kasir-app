<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $buyPrice = fake()->randomFloat(2, 5, 100);
        $sellPrice = $buyPrice * fake()->randomFloat(2, 1.2, 2.5); // 20-150% markup
        $hasFixedPrice = fake()->boolean(30); // 30% chance of having fixed price
        
        return [
            'name' => fake()->words(random_int(2, 4), true),
            'sku' => strtoupper(fake()->unique()->bothify('??###??')),
            'category_id' => Category::factory(),
            'buy_price' => $buyPrice,
            'sell_price' => $sellPrice,
            'fixed_price' => $hasFixedPrice ? $sellPrice * fake()->randomFloat(2, 0.9, 1.1) : null,
            'current_stock' => fake()->numberBetween(0, 500),
            'minimum_stock' => fake()->numberBetween(5, 50),
            'unit_of_measure' => fake()->randomElement(['pcs', 'box', 'kg', 'liter', 'pack', 'dozen']),
            'description' => fake()->optional()->paragraph(),
            'image_path' => fake()->optional()->imageUrl(300, 300, 'products'),
            'is_active' => fake()->boolean(90), // 90% active
        ];
    }

    /**
     * Indicate that the product has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_stock' => fake()->numberBetween(0, $attributes['minimum_stock']),
        ]);
    }

    /**
     * Indicate that the product has a fixed price.
     */
    public function withFixedPrice(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'fixed_price' => $attributes['sell_price'] * fake()->randomFloat(2, 0.9, 1.1),
            ];
        });
    }
}
<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalAmount = fake()->randomFloat(2, 10, 1000);
        $totalProfit = $totalAmount * fake()->randomFloat(2, 0.1, 0.4); // 10-40% profit margin

        return [
            'transaction_code' => Transaction::generateTransactionCode(),
            'user_id' => User::factory(),
            'total_amount' => $totalAmount,
            'total_profit' => $totalProfit,
            'items' => [],
            'status' => fake()->randomElement(['completed', 'cancelled', 'pending']),
            'created_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the transaction is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Indicate that the transaction is from today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'created_at' => now()->subHours(fake()->numberBetween(1, 12)),
        ]);
    }
}
<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create categories
        $categories = Category::factory(10)->create();

        // Create specific categories for retail business
        $specificCategories = [
            ['name' => 'Electronics', 'description' => 'Electronic devices and gadgets'],
            ['name' => 'Clothing', 'description' => 'Apparel and accessories'],
            ['name' => 'Food & Beverages', 'description' => 'Food items and drinks'],
            ['name' => 'Home & Garden', 'description' => 'Home improvement and gardening supplies'],
            ['name' => 'Beauty & Health', 'description' => 'Personal care and health products'],
        ];

        foreach ($specificCategories as $categoryData) {
            Category::firstOrCreate(['name' => $categoryData['name']], $categoryData);
        }

        // Create products
        $allCategories = Category::all();
        foreach ($allCategories as $category) {
            Product::factory(random_int(5, 15))
                ->for($category)
                ->create();
        }

        // Create some products with low stock
        Product::factory(10)
            ->for($allCategories->random())
            ->lowStock()
            ->create();

        // Create products with fixed prices
        Product::factory(15)
            ->for($allCategories->random())
            ->withFixedPrice()
            ->create();

        // Create transactions
        Transaction::factory(50)
            ->for($user)
            ->completed()
            ->create();

        // Create some recent transactions
        Transaction::factory(10)
            ->for($user)
            ->today()
            ->create();

        $this->command->info('Database seeded successfully!');
        $this->command->info('Login with: test@example.com / password');
    }
}
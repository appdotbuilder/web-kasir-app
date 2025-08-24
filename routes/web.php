<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - Administrator overview
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // POS - Point of Sale interface
    Route::controller(POSController::class)->group(function () {
        Route::get('/pos', 'index')->name('pos.index');
        Route::post('/pos', 'store')->name('pos.store');
    });
    
    // Product Management
    Route::resource('products', ProductController::class);
    
    // Category Management
    Route::resource('categories', CategoryController::class);
    
    // Transaction Management
    Route::resource('transactions', TransactionController::class)->only(['index', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

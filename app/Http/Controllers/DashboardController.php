<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Today's sales
        $todaySales = Transaction::completed()->today()->sum('total_amount');
        $todayProfit = Transaction::completed()->today()->sum('total_profit');
        $todayTransactions = Transaction::completed()->today()->count();

        // This week's sales
        $weekSales = Transaction::completed()->thisWeek()->sum('total_amount');
        $weekProfit = Transaction::completed()->thisWeek()->sum('total_profit');

        // Low stock products
        $lowStockProducts = Product::lowStock()->active()->with('category')->get();

        // Best selling products (by quantity sold)
        $bestSellingProducts = DB::table('transaction_items')
            ->join('products', 'transaction_items.product_id', '=', 'products.id')
            ->join('transactions', 'transaction_items.transaction_id', '=', 'transactions.id')
            ->where('transactions.status', 'completed')
            ->select(
                'products.name',
                'products.sku',
                DB::raw('SUM(transaction_items.quantity) as total_sold'),
                DB::raw('SUM(transaction_items.total_profit) as total_profit')
            )
            ->groupBy('products.id', 'products.name', 'products.sku')
            ->orderByDesc('total_sold')
            ->limit(10)
            ->get();

        // Recent transactions
        $recentTransactions = Transaction::completed()
            ->with('user:id,name')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'transaction_code' => $transaction->transaction_code,
                    'total_amount' => $transaction->total_amount,
                    'total_profit' => $transaction->total_profit,
                    'user_name' => $transaction->user->name,
                    'created_at' => $transaction->created_at->format('d/m/Y H:i'),
                ];
            });

        // Sales data for charts (last 7 days)
        $salesChart = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $dailySales = Transaction::completed()
                ->whereDate('created_at', $date)
                ->sum('total_amount');
            
            $salesChart[] = [
                'date' => $date->format('d/m'),
                'sales' => floatval($dailySales),
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'today_sales' => floatval($todaySales),
                'today_profit' => floatval($todayProfit),
                'today_transactions' => $todayTransactions,
                'week_sales' => floatval($weekSales),
                'week_profit' => floatval($weekProfit),
            ],
            'low_stock_products' => $lowStockProducts,
            'best_selling_products' => $bestSellingProducts,
            'recent_transactions' => $recentTransactions,
            'sales_chart' => $salesChart,
        ]);
    }
}
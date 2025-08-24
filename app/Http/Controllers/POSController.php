<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProcessSaleRequest;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index(Request $request)
    {
        $query = Product::active()->with('category');

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->get('category'));
        }

        $products = $query->get();

        return Inertia::render('pos/index', [
            'products' => $products,
        ]);
    }

    /**
     * Process a sale transaction.
     */
    public function store(ProcessSaleRequest $request)
    {
        try {
            DB::beginTransaction();

            $items = $request->validated()['items'];
            $totalAmount = 0;
            $totalProfit = 0;
            $transactionItems = [];

            // Validate stock availability and calculate totals
            foreach ($items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                if ($product->current_stock < $item['quantity']) {
                    DB::rollBack();
                    return redirect()->back()
                        ->with('error', "Insufficient stock for {$product->name}. Available: {$product->current_stock}");
                }

                // Determine price to use (fixed price if available, otherwise sell price)
                $unitPrice = $product->fixed_price ?? $product->sell_price;
                $totalPrice = $unitPrice * $item['quantity'];
                $unitProfit = $unitPrice - $product->buy_price;
                $totalItemProfit = $unitProfit * $item['quantity'];

                $totalAmount += $totalPrice;
                $totalProfit += $totalItemProfit;

                $transactionItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                    'unit_profit' => $unitProfit,
                    'total_profit' => $totalItemProfit,
                    'used_fixed_price' => $product->fixed_price !== null,
                ];

                // Reduce stock
                $product->reduceStock($item['quantity']);
            }

            // Create transaction
            $transaction = Transaction::create([
                'transaction_code' => Transaction::generateTransactionCode(),
                'user_id' => auth()->id(),
                'total_amount' => $totalAmount,
                'total_profit' => $totalProfit,
                'items' => $transactionItems,
                'status' => 'completed',
            ]);

            // Create transaction items
            foreach ($transactionItems as $item) {
                TransactionItem::create(array_merge($item, [
                    'transaction_id' => $transaction->id,
                ]));
            }

            DB::commit();

            return Inertia::render('pos/receipt', [
                'transaction' => $transaction->load('transactionItems.product'),
                'success' => 'Transaction completed successfully!',
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->with('error', 'Transaction failed: ' . $e->getMessage());
        }
    }
}
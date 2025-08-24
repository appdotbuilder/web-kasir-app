<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Transaction::with('user:id,name')
            ->withCount('transactionItems');

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where('transaction_code', 'like', "%{$search}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->get('date_from'));
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->get('date_to'));
        }

        $transactions = $query->latest()->paginate(20);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load([
            'user:id,name',
            'transactionItems.product:id,name,sku'
        ]);

        return Inertia::render('transactions/show', [
            'transaction' => $transaction,
        ]);
    }
}
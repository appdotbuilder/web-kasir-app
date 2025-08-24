<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TransactionItem
 *
 * @property int $id
 * @property int $transaction_id
 * @property int $product_id
 * @property string $product_name
 * @property string $product_sku
 * @property int $quantity
 * @property float $unit_price
 * @property float $total_price
 * @property float $unit_profit
 * @property float $total_profit
 * @property bool $used_fixed_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Transaction $transaction
 * @property-read \App\Models\Product $product
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereProductName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereProductSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereTotalProfit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereUnitProfit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TransactionItem whereUsedFixedPrice($value)

 * 
 * @mixin \Eloquent
 */
class TransactionItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'transaction_id',
        'product_id',
        'product_name',
        'product_sku',
        'quantity',
        'unit_price',
        'total_price',
        'unit_profit',
        'total_profit',
        'used_fixed_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'unit_profit' => 'decimal:2',
        'total_profit' => 'decimal:2',
        'used_fixed_price' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the transaction that owns the transaction item.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    /**
     * Get the product that owns the transaction item.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
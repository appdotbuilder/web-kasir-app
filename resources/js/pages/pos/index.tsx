import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    sku: string;
    sell_price: number;
    fixed_price: number | null;
    current_stock: number;
    unit_of_measure: string;
    category: {
        name: string;
    };
}

interface CartItem extends Product {
    quantity: number;
    total_price: number;
}

interface Props {
    products: Product[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Point of Sale',
        href: '/pos',
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function POSIndex({ products }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { setData, post, processing, errors } = useForm({
        items: [] as Array<{ product_id: number; quantity: number }>
    });

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.id === product.id);
        const effectivePrice = product.fixed_price ?? product.sell_price;
        
        if (existingItem) {
            if (existingItem.quantity < product.current_stock) {
                setCart(cart.map(item =>
                    item.id === product.id
                        ? { 
                            ...item, 
                            quantity: item.quantity + 1,
                            total_price: (item.quantity + 1) * effectivePrice
                        }
                        : item
                ));
            }
        } else {
            if (product.current_stock > 0) {
                setCart([...cart, {
                    ...product,
                    quantity: 1,
                    total_price: effectivePrice
                }]);
            }
        }
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        if (quantity <= product.current_stock) {
            const effectivePrice = product.fixed_price ?? product.sell_price;
            setCart(cart.map(item =>
                item.id === productId
                    ? { 
                        ...item, 
                        quantity,
                        total_price: quantity * effectivePrice
                    }
                    : item
            ));
        }
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + item.total_price, 0);
    };

    const processSale = () => {
        if (cart.length === 0) return;

        const items = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        setData('items', items);
        post(route('pos.store'));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point of Sale" />
            
            <div className="flex h-full">
                {/* Product Selection Area */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            💰 Point of Sale
                        </h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products by name or SKU..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                🔍
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`bg-white rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700 ${
                                    product.current_stock === 0 ? 'opacity-50' : ''
                                }`}
                                onClick={() => addToCart(product)}
                            >
                                <div className="mb-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {product.category.name} • {product.sku}
                                    </p>
                                </div>
                                
                                <div className="space-y-1">
                                    {product.fixed_price ? (
                                        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md dark:bg-yellow-900/20 dark:border-yellow-700">
                                            <p className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
                                                🎯 Fixed Price: {formatCurrency(product.fixed_price)}
                                            </p>
                                            <p className="text-xs text-gray-600 line-through dark:text-gray-400">
                                                Regular: {formatCurrency(product.sell_price)}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {formatCurrency(product.sell_price)}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="mt-2 flex items-center justify-between">
                                    <span className={`text-sm ${
                                        product.current_stock > 10 
                                            ? 'text-green-600 dark:text-green-400' 
                                            : product.current_stock > 0 
                                            ? 'text-yellow-600 dark:text-yellow-400' 
                                            : 'text-red-600 dark:text-red-400'
                                    }`}>
                                        Stock: {product.current_stock} {product.unit_of_measure}
                                    </span>
                                    {product.current_stock === 0 && (
                                        <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                No products found matching your search.
                            </p>
                        </div>
                    )}
                </div>

                {/* Shopping Cart */}
                <div className="w-96 bg-white border-l border-gray-200 p-6 flex flex-col dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            🛒 Cart ({cart.length})
                        </h2>
                        {cart.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-auto">
                        {cart.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400">
                                    Your cart is empty
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    Click on products to add them
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <div key={item.id} className="bg-gray-50 rounded-lg p-3 dark:bg-gray-700">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.sku}
                                                </p>
                                                {item.fixed_price && (
                                                    <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                                                        🎯 Fixed Price
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center dark:bg-gray-600 dark:hover:bg-gray-500"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.current_stock}
                                                    className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-500"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900 dark:text-gray-100">
                                                    {formatCurrency(item.total_price)}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    @ {formatCurrency(item.fixed_price ?? item.sell_price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Total and Checkout */}
                    {cart.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-4 dark:border-gray-600">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Total:</span>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatCurrency(getTotalAmount())}
                                </span>
                            </div>
                            
                            {errors.items && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-700">
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.items}</p>
                                </div>
                            )}
                            
                            <button
                                onClick={processSale}
                                disabled={processing || cart.length === 0}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
                            >
                                {processing ? '⏳ Processing...' : '💳 Process Sale'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardStats {
    today_sales: number;
    today_profit: number;
    today_transactions: number;
    week_sales: number;
    week_profit: number;
}

interface LowStockProduct {
    id: number;
    name: string;
    sku: string;
    current_stock: number;
    minimum_stock: number;
    category: {
        name: string;
    };
}

interface BestSellingProduct {
    name: string;
    sku: string;
    total_sold: number;
    total_profit: number;
}

interface RecentTransaction {
    id: number;
    transaction_code: string;
    total_amount: number;
    total_profit: number;
    user_name: string;
    created_at: string;
}

interface SalesChartData {
    date: string;
    sales: number;
}

interface Props {
    stats: DashboardStats;
    low_stock_products: LowStockProduct[];
    best_selling_products: BestSellingProduct[];
    recent_transactions: RecentTransaction[];
    sales_chart: SalesChartData[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function Dashboard({ 
    stats, 
    low_stock_products, 
    best_selling_products, 
    recent_transactions,
    sales_chart 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Administrator Overview" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            📊 Administrator Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Overview of your retail business performance
                        </p>
                    </div>
                    <Link
                        href={route('pos.index')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                        💰 Open POS
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sales</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {formatCurrency(stats.today_sales)}
                                </p>
                            </div>
                            <div className="text-3xl">💰</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Profit</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {formatCurrency(stats.today_profit)}
                                </p>
                            </div>
                            <div className="text-3xl">📈</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Transactions</p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {stats.today_transactions}
                                </p>
                            </div>
                            <div className="text-3xl">🧾</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Week's Sales</p>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {formatCurrency(stats.week_sales)}
                                </p>
                            </div>
                            <div className="text-3xl">📊</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Week's Profit</p>
                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {formatCurrency(stats.week_profit)}
                                </p>
                            </div>
                            <div className="text-3xl">💎</div>
                        </div>
                    </div>
                </div>

                {/* Charts and Analytics */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Sales Chart */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            📈 Sales Trend (Last 7 Days)
                        </h3>
                        <div className="space-y-3">
                            {sales_chart.map((data, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{data.date}</span>
                                    <div className="flex items-center gap-2 flex-1 mx-4">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{
                                                    width: `${Math.min((data.sales / Math.max(...sales_chart.map(d => d.sales))) * 100, 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {formatCurrency(data.sales)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low Stock Alerts */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                ⚠️ Low Stock Alerts
                            </h3>
                            <Link
                                href={route('products.index', { low_stock: 1 })}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {low_stock_products.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                    ✅ All products have sufficient stock!
                                </p>
                            ) : (
                                low_stock_products.slice(0, 5).map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg dark:bg-red-900/20">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {product.category.name} • SKU: {product.sku}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                                {product.current_stock} / {product.minimum_stock}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Best Selling Products and Recent Transactions */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Best Selling Products */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            🏆 Best Selling Products
                        </h3>
                        <div className="space-y-3">
                            {best_selling_products.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                    No sales data available yet
                                </p>
                            ) : (
                                best_selling_products.slice(0, 5).map((product, index) => (
                                    <div key={product.sku} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full text-sm font-bold text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{product.total_sold} sold</p>
                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                {formatCurrency(product.total_profit)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                🧾 Recent Transactions
                            </h3>
                            <Link
                                href={route('transactions.index')}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent_transactions.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                    No transactions yet
                                </p>
                            ) : (
                                recent_transactions.slice(0, 5).map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700/50">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                {transaction.transaction_code}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {transaction.user_name} • {transaction.created_at}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                {formatCurrency(transaction.total_amount)}
                                            </p>
                                            <p className="text-sm text-green-600 dark:text-green-400">
                                                Profit: {formatCurrency(transaction.total_profit)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        🚀 Quick Actions
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href={route('pos.index')}
                            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
                        >
                            <div className="text-2xl">💰</div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">Open POS</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Process sales</p>
                            </div>
                        </Link>

                        <Link
                            href={route('products.create')}
                            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
                        >
                            <div className="text-2xl">📦</div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">Add Product</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">New inventory</p>
                            </div>
                        </Link>

                        <Link
                            href={route('products.index')}
                            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
                        >
                            <div className="text-2xl">📋</div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">Manage Products</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">View inventory</p>
                            </div>
                        </Link>

                        <Link
                            href={route('categories.index')}
                            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
                        >
                            <div className="text-2xl">🏷️</div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">Categories</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Organize products</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
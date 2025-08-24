import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="RetailPOS - Complete Point of Sale & Inventory Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-8 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xl">
                                🏪
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">RetailPOS</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                                >
                                    📊 Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="w-full max-w-6xl">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="mb-6 text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            🏪 Complete Retail Management System
                        </h1>
                        <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Streamline your retail business with our comprehensive Point of Sale and Inventory Management system. 
                            Built for efficiency, designed for growth.
                        </p>
                        {!auth.user && (
                            <div className="flex items-center justify-center gap-4">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
                                >
                                    🚀 Start Your Free Trial
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors dark:hover:bg-blue-900/20"
                                >
                                    🔑 Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="mb-4 text-4xl">💰</div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">Point of Sale</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Fast and intuitive POS interface with support for fixed pricing (harga pas) and real-time inventory updates.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="mb-4 text-4xl">📦</div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">Inventory Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Complete product management with SKU tracking, stock levels, minimum stock alerts, and categories.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="mb-4 text-4xl">📊</div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Real-time sales reports, profit analysis, and business insights with daily, weekly, and monthly views.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="mb-4 text-4xl">⚡</div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">Real-time Alerts</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get notified when products reach minimum stock levels and never run out of popular items.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="mb-4 text-4xl">📈</div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">Sales Tracking</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Monitor best-selling products, transaction history, and gross profit calculations automatically.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="mb-4 text-4xl">🔧</div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">Easy Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                User-friendly interface for product creation, category management, and transaction processing.
                            </p>
                        </div>
                    </div>

                    {/* Demo Screenshots */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg dark:bg-gray-800 mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                            🖥️ See It In Action
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8 dark:from-blue-900/30 dark:to-blue-800/30">
                                <h3 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-100">📱 POS Interface</h3>
                                <div className="bg-white rounded-lg p-4 shadow dark:bg-gray-700">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-blue-100 rounded p-2 text-xs dark:bg-blue-900/30">Product Scanner Ready</div>
                                        <div className="bg-green-100 rounded p-2 text-xs dark:bg-green-900/30">Fixed Price: Rp 25,000 🎯</div>
                                        <div className="bg-gray-100 rounded p-2 text-xs dark:bg-gray-600">Cart: 3 items - Rp 75,000</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-8 dark:from-green-900/30 dark:to-green-800/30">
                                <h3 className="text-xl font-bold mb-4 text-green-900 dark:text-green-100">📊 Analytics View</h3>
                                <div className="bg-white rounded-lg p-4 shadow dark:bg-gray-700">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-blue-100 rounded p-2 text-xs dark:bg-blue-900/30">Today's Sales: Rp 2,450,000</div>
                                        <div className="bg-yellow-100 rounded p-2 text-xs dark:bg-yellow-900/30">⚠️ 5 Products Low Stock</div>
                                        <div className="bg-green-100 rounded p-2 text-xs dark:bg-green-900/30">📈 Best Seller: Electronics</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                            🎯 Why Choose Our POS System?
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-4xl mb-2">🚀</div>
                                <h4 className="font-bold text-lg mb-2">Lightning Fast</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Process transactions in seconds</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🔒</div>
                                <h4 className="font-bold text-lg mb-2">Secure & Reliable</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Your data is always protected</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">📱</div>
                                <h4 className="font-bold text-lg mb-2">Modern Interface</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Clean, intuitive design</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-2">💎</div>
                                <h4 className="font-bold text-lg mb-2">Feature Complete</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Everything you need included</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth.user && (
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business? 🚀</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Join thousands of retailers already using our system to boost their sales and streamline operations.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
                                >
                                    🎯 Start Free Trial
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
                                >
                                    🔑 Sign In
                                </Link>
                            </div>
                        </div>
                    )}

                    {auth.user && (
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Welcome Back! 🎉</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Your POS system is ready to go. Access your dashboard to manage products, process sales, and view analytics.
                            </p>
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
                            >
                                📊 Go to Dashboard
                            </Link>
                        </div>
                    )}
                </main>

                <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        Built with ❤️ by{" "}
                        <a 
                            href="https://app.build" 
                            target="_blank" 
                            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                            app.build
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}
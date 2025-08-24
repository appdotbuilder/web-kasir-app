import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface TransactionItem {
    id: number;
    product_name: string;
    product_sku: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    used_fixed_price: boolean;
}

interface Transaction {
    id: number;
    transaction_code: string;
    total_amount: number;
    total_profit: number;
    created_at: string;
    transaction_items: TransactionItem[];
}

interface Props {
    transaction: Transaction;
    success?: string;
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
    {
        title: 'Receipt',
        href: '#',
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function Receipt({ transaction, success }: Props) {
    const printReceipt = () => {
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaction Receipt" />
            
            <div className="max-w-2xl mx-auto p-6">
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-700">
                        <div className="flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400 text-xl">✅</span>
                            <p className="text-green-800 dark:text-green-300 font-medium">{success}</p>
                        </div>
                    </div>
                )}

                {/* Receipt */}
                <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg dark:bg-gray-800 dark:border-gray-700" id="receipt">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            🏪 RetailPOS
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">Complete Retail Management System</p>
                        <div className="border-b border-gray-300 my-4"></div>
                    </div>

                    {/* Transaction Info */}
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            🧾 SALES RECEIPT
                        </h2>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p><span className="font-medium">Transaction:</span> {transaction.transaction_code}</p>
                            <p><span className="font-medium">Date:</span> {new Date(transaction.created_at).toLocaleString('id-ID')}</p>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">Item</th>
                                    <th className="text-center py-2 text-gray-700 dark:text-gray-300">Qty</th>
                                    <th className="text-right py-2 text-gray-700 dark:text-gray-300">Price</th>
                                    <th className="text-right py-2 text-gray-700 dark:text-gray-300">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.transaction_items.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200">
                                        <td className="py-3 text-gray-900 dark:text-gray-100">
                                            <div>
                                                <p className="font-medium">{item.product_name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SKU: {item.product_sku}
                                                    {item.used_fixed_price && (
                                                        <span className="ml-2 text-yellow-600 dark:text-yellow-400 font-medium">
                                                            🎯 Fixed Price
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-3 text-center text-gray-900 dark:text-gray-100">
                                            {item.quantity}
                                        </td>
                                        <td className="py-3 text-right text-gray-900 dark:text-gray-100">
                                            {formatCurrency(item.unit_price)}
                                        </td>
                                        <td className="py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                                            {formatCurrency(item.total_price)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="border-t border-gray-300 pt-4">
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                            <span>TOTAL:</span>
                            <span>{formatCurrency(transaction.total_amount)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-2">Thank you for your business! 🙏</p>
                        <p>Have a great day!</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-4 mt-6 print:hidden">
                    <button
                        onClick={printReceipt}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        🖨️ Print Receipt
                    </button>
                    
                    <Link
                        href={route('pos.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        🛒 New Sale
                    </Link>
                    
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        📊 Dashboard
                    </Link>
                </div>
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #receipt, #receipt * {
                        visibility: visible;
                    }
                    #receipt {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}</style>
        </AppLayout>
    );
}
"use client";

import { Product } from '@/lib/types';
import { useApi } from '@/hooks/useApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorAlert from '@/components/ui/ErrorAlert';
import DataTable from '@/components/ui/DataTable';

export default function ProductsPage() {
  const { data: products, loading, error } = useApi<Product[]>(async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("製品データの取得に失敗しました");
    }
    return response.json();
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  const columns = [
    {
      key: 'name',
      header: '名前',
      render: (product: Product) => (
        <div className="font-medium text-gray-900">{product.name}</div>
      )
    },
    {
      key: 'description',
      header: '説明',
      render: (product: Product) => (
        <div className="text-sm text-gray-500">
          {product.description || "説明なし"}
        </div>
      )
    },
    {
      key: 'price',
      header: '価格',
      className: 'whitespace-nowrap',
      render: (product: Product) => (
        <div className="text-sm text-gray-900">
          {product.price.toLocaleString()}円
        </div>
      )
    },
    {
      key: 'quantity',
      header: '在庫数',
      className: 'whitespace-nowrap',
      render: (product: Product) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            product.quantity > 10
              ? "bg-green-100 text-green-800"
              : product.quantity > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.quantity}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      className: 'relative',
      render: () => (
        <div className="whitespace-nowrap text-right text-sm font-medium">
          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
            編集
          </button>
          <button className="text-red-600 hover:text-red-900">
            削除
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            製品一覧
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            すべての製品を表示しています
          </p>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            製品を追加
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <DataTable
          data={products || []}
          columns={columns}
          emptyMessage="製品がありません。新しい製品を追加してください。"
        />
      </div>
    </div>
  );
}

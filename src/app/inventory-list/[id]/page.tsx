'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  category: string;
  location: string;
  lastUpdated: string;
  minimumQuantity: number;
  supplier: string;
}

export default function InventoryDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/inventory/${params.id}`);
        if (!response.ok) {
          throw new Error('在庫データの取得に失敗しました');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!item) {
    return <div className="text-center mt-4">在庫データが見つかりません</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">在庫詳細</h1>
        <div className="space-x-4">
          <Link
            href={`/inventory-list/${params.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            編集
          </Link>
          <Link
            href="/inventory-list"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            一覧に戻る
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">商品名</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.name}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">カテゴリー</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.category}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">在庫数</dt>
              <dd className="mt-1">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.quantity <= 0
                      ? 'bg-red-100 text-red-800'
                      : item.quantity <= item.minimumQuantity
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.quantity}個
                </span>
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">単価</dt>
              <dd className="mt-1 text-sm text-gray-900">
                ¥{item.unitPrice.toLocaleString()}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">保管場所</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.location}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">最終更新日</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(item.lastUpdated).toLocaleDateString()}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">最小在庫数</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.minimumQuantity}個</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">仕入先</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.supplier}</dd>
            </div>

            {item.description && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">説明</dt>
                <dd className="mt-1 text-sm text-gray-900">{item.description}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
} 
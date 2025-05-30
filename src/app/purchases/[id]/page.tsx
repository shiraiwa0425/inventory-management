'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Purchase {
  id: number;
  vendor: {
    name: string;
  };
  purchaseDate: string;
  totalAmount: number;
  status: string;
  notes: string | null;
}

export default function PurchaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setResolvedParams(resolvedParams);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchPurchase = async () => {
      try {
        const response = await fetch(`/api/purchases/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error('仕入データの取得に失敗しました');
        }
        const data = await response.json();
        setPurchase(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [resolvedParams]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">読み込み中...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!purchase) {
    return <div className="text-center mt-4">仕入データが見つかりません</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">仕入詳細</h1>
        <div className="space-x-4">
          <Link
            href={`/purchases/${resolvedParams?.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            編集
          </Link>
          <Link
            href="/purchases"
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
              <dt className="text-sm font-medium text-gray-500">仕入先</dt>
              <dd className="mt-1 text-sm text-gray-900">{purchase.vendor.name}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">仕入日</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">合計金額</dt>
              <dd className="mt-1 text-sm text-gray-900">
                ¥{purchase.totalAmount.toLocaleString()}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">ステータス</dt>
              <dd className="mt-1">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    purchase.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : purchase.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {purchase.status === 'completed'
                    ? '完了'
                    : purchase.status === 'pending'
                    ? '処理中'
                    : 'キャンセル'}
                </span>
              </dd>
            </div>

            {purchase.notes && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">備考</dt>
                <dd className="mt-1 text-sm text-gray-900">{purchase.notes}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
} 
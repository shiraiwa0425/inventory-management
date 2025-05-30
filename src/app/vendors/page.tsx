'use client';

import Link from 'next/link';
import { Vendor } from '@/lib/types';
import { useApi } from '@/hooks/useApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorAlert from '@/components/ui/ErrorAlert';
import DataTable from '@/components/ui/DataTable';

export default function VendorsPage() {
  const { data: vendors, loading, error } = useApi<Vendor[]>(async () => {
    const response = await fetch('/api/vendors');
    if (!response.ok) {
      throw new Error('仕入先データの取得に失敗しました');
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
      header: '仕入先名',
      render: (vendor: Vendor) => (
        <div className="font-medium text-gray-900">{vendor.name}</div>
      )
    },
    {
      key: 'address',
      header: '住所',
      render: (vendor: Vendor) => (
        <div className="text-sm text-gray-900">{vendor.address}</div>
      )
    },
    {
      key: 'contact',
      header: '連絡先',
      className: 'whitespace-nowrap',
      render: (vendor: Vendor) => (
        <div className="text-sm text-gray-900">{vendor.contact}</div>
      )
    },
    {
      key: 'taxId',
      header: '税番号',
      className: 'whitespace-nowrap',
      render: (vendor: Vendor) => (
        <div className="text-sm text-gray-900">{vendor.taxId}</div>
      )
    },
    {
      key: 'actions',
      header: '',
      className: 'relative',
      render: (vendor: Vendor) => (
        <div className="whitespace-nowrap text-right text-sm font-medium">
          <Link
            href={`/vendors/${vendor.id}`}
            className="text-indigo-600 hover:text-indigo-900 mr-4"
          >
            詳細
          </Link>
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
            仕入先一覧
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            すべての仕入先を表示しています
          </p>
        </div>
        <div>
          <Link
            href="/vendors/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            新規仕入先
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <DataTable
          data={vendors || []}
          columns={columns}
          emptyMessage="仕入先がありません。新しい仕入先を作成してください。"
        />
      </div>
    </div>
  );
} 
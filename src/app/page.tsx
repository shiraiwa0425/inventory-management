import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          仕入管理システムへようこそ
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          このシステムでは製品の在庫を管理できます。
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">仕入管理</h3>
              <p className="mt-2 text-sm text-gray-500">
                製品の追加、編集、削除を行います。
              </p>
              <div className="mt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  仕入一覧を見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

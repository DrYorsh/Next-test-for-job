import type { User } from '@/shared/types/user.interface';
import Link from 'next/link';

async function getUsers(): Promise<User[]> {
  // Имитация загрузки данных с внешнего API
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store' // Принудительное отключение кеширования для SSR
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}

export default async function SSRPage() {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Server-Side Rendering (SSR)
          </h1>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-800">
              <strong>SSR:</strong> Страница рендерится на сервере при каждом запросе.
              Данные всегда актуальные, но время загрузки больше.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.slice(0, 6).map((user) => (
              <div key={user.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-blue-600 text-sm">@{user.username}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Назад к главной
          </Link>
        </div>
      </div>
    </div>
  );
}



import type { Post } from "@/shared/types/post.interface";
import Link from "next/link";

async function getPosts(): Promise<Post[]> {
  // Данные загружаются во время сборки (build time)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache' // Принудительное кеширование для SSG
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function SSGPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Static Site Generation (SSG)
          </h1>
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-800">
              <strong>SSG:</strong> Страница генерируется во время сборки и кешируется. 
              Очень быстрая загрузка, но данные могут быть устаревшими.
            </p>
          </div>
          
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {post.body}
                </p>
                <div className="mt-3 text-sm text-blue-600">
                  Автор ID: {post.userId}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            ← Назад к главной
          </Link>
        </div>
      </div>
    </div>
  );
}



import type { Comment } from "@/shared/types/comment.interface";
import Link from "next/link";

async function getComments(): Promise<Comment[]> {
  // ISR: страница будет перегенерирована максимум каждые 60 секунд
  const res = await fetch('https://jsonplaceholder.typicode.com/comments', {
    next: { revalidate: 60 } // ISR с интервалом 60 секунд
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return res.json();
}

export default async function ISRPage() {
  const comments = await getComments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Incremental Static Regeneration (ISR)
          </h1>
          <div className="bg-purple-100 border-l-4 border-purple-500 p-4 mb-6">
            <p className="text-purple-800">
              <strong>ISR:</strong> Страница генерируется статически, но автоматически 
              обновляется через заданные интервалы. Баланс между скоростью и актуальностью.
            </p>
          </div>
          
          <div className="space-y-4">
            {comments.slice(0, 8).map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg text-gray-800">{comment.name}</h4>
                  <span className="text-sm text-gray-500">Пост #{comment.postId}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{comment.email}</p>
                <p className="text-gray-700 leading-relaxed">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            ← Назад к главной
          </Link>
        </div>
      </div>
    </div>
  );
}



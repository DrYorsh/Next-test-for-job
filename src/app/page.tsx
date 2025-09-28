'use client'

import Image from "next/image";
import Link from "next/link";
import Modal from "./components/Modal";
import { useState } from "react";
import ModalForm from "./components/ModalForm";

export default function Home() {
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <Image
            className="dark:invert mx-auto mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={200}
            height={42}
            priority
          />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            NextJS Рендеринг Страницы
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 ">
          {/* SSR Card */}
          <Link href="/ssr" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-yellow-500">
              <div className="text-yellow-600 text-4xl mb-4">⚡</div>
              <h3 className="text-xl min-h-20 font-bold text-gray-800 mb-3">Server-Side Rendering</h3>
              <p className="text-gray-600 text-sm mb-4">
                Рендеринг на сервере при каждом запросе. Данные всегда актуальные.
              </p>
              <div className="text-yellow-600 font-semibold text-sm group-hover:text-yellow-700">
                Перейти к SSR →
              </div>
            </div>
          </Link>

          {/* SSG Card */}
          <Link href="/ssg" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-green-500">
              <div className="text-green-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl min-h-20 font-bold text-gray-800 mb-3">Static Site Generation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Генерация статических страниц во время сборки. Максимальная скорость.
              </p>
              <div className="text-green-600 font-semibold text-sm group-hover:text-green-700">
                Перейти к SSG →
              </div>
            </div>
          </Link>

          {/* ISR Card */}
          <Link href="/isr" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-purple-500">
              <div className="text-purple-600 text-4xl mb-4">🔄</div>
              <h3 className="text-xl min-h-20 font-bold text-gray-800 mb-3">Incremental Static Regeneration</h3>
              <p className="text-gray-600 text-sm mb-4">
                Статическая генерация с автоматическим обновлением через интервалы.
              </p>
              <div className="text-purple-600 font-semibold text-sm group-hover:text-purple-700">
                Перейти к ISR →
              </div>
            </div>
          </Link>

          {/* CSR Card */}
          <Link href="/csr" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-orange-500">
              <div className="text-orange-600 text-4xl mb-4">💻</div>
              <h3 className="text-xl min-h-20 font-bold text-gray-800 mb-3">Client-Side Rendering</h3>
              <p className="text-gray-600 text-sm mb-4">
                Рендеринг на клиенте. Данные загружаются после первоначального рендеринга.
              </p>
              <div className="text-orange-600 font-semibold text-sm group-hover:text-orange-700">
                Перейти к CSR →
              </div>
            </div>
          </Link>
        </div>

        {modal && <Modal title='Отправить запрос добрым людям' onClose={() => setModal(false)}>
          <ModalForm onClose={() => setModal(false)}/>
        </Modal>}

        <button className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2' onClick={() => setModal(true)}>+</button>
      </div>
    </div>
  );
}

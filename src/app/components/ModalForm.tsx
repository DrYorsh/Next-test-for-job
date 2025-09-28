'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  file: File | null;
}

export default function ModalForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Имитация отправки данных
      await new Promise(resolve => setTimeout(resolve, 2000));
      // А так можно отправить данные
      // const responce = await axios.post<TProduct>('https://fakestoreapi.com/products', formData);

      console.log('Отправленные данные:', formData);
      alert('Форма успешно отправлена!');

      // Сброс формы
      setFormData({
        name: '',
        email: '',
        file: null
      });
      onClose()
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Произошла ошибка при отправке формы');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Имя *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Введите ваше имя"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Введите ваш email"
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
          Файл
        </label>
        <div className="relative">
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
        </div>
        {formData.file && (
          <p className="mt-2 text-sm text-gray-600">
            Выбранный файл: {formData.file.name}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              file: null
            });
          }}
        >
          Очистить
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.email}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправка...
            </span>
          ) : (
            'Отправить'
          )}
        </button>
      </div>
    </form>
  );
}

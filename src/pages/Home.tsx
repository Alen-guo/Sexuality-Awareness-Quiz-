import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const t = useI18n();
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-8">
          {t.home.title}
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.home.desc}
        </p>
        <Link
          to="/test"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          {t.home.start}
        </Link>
      </div>

      {/* 性取向认知测试介绍 */}
      <div className="mt-12 max-w-3xl mx-auto bg-purple-50 border-l-4 border-purple-400 p-6 rounded text-gray-700 text-base leading-relaxed">
        {t.home.intro}
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.home.features.map((f: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 
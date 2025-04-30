import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">性取向测试</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              首页
            </Link>
            <Link
              to="/test"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              测试
            </Link>
            <Link
              to="/types"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              性取向类型
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              个人中心
            </Link>
            <button
              onClick={toggleLang}
              className="ml-2 px-3 py-1 border border-purple-300 rounded text-purple-700 hover:bg-purple-50 transition"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
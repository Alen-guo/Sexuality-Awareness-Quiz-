import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-8">
          免费探索你的性别认同
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          通过我们的专业测试，帮助你更好地了解自己的性别认同和表达方式。
          只需3分钟，获得深入的个人分析报告。
        </p>
        <Link
          to="/test"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          开始测试
        </Link>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">专业分析</h3>
          <p className="text-gray-600">
            基于心理学研究和性别研究理论，提供专业的分析报告。
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">隐私保护</h3>
          <p className="text-gray-600">
            我们严格保护您的隐私，所有测试数据都经过加密处理。
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">持续支持</h3>
          <p className="text-gray-600">
            提供后续咨询服务，帮助您更好地理解和接纳自己。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home; 
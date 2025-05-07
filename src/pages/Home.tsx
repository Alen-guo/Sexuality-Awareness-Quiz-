import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-8">
          免费探索你的性取向
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          通过我们的专业测试，帮助你更好地了解自己的性取向和表达方式。
          只需3分钟，获得深入的个人分析报告。
        </p>
        <Link
          to="/test"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          开始测试
        </Link>
      </div>

      {/* 性取向认知测试介绍 */}
      <div className="mt-12 max-w-3xl mx-auto bg-purple-50 border-l-4 border-purple-400 p-6 rounded text-gray-700 text-base leading-relaxed">
        SQS性取向认知测试是一款基于心理学与社会学理论开发的自助评估工具，旨在帮助用户科学、理性地探索自身的情感吸引、关系模式与身份认同。测试内容涵盖多元性取向类型，结合国际主流研究成果，采用结构化问卷与智能算法分析，为每位用户提供个性化的结果解读与生活建议。我们尊重每一种性取向，倡导包容与理解，强调性取向的流动性和多样性。测试结果仅供自我认知参考，不作医学或法律诊断。如有困惑或需要支持，建议寻求专业心理咨询或LGBTQ+公益机构帮助。让我们一起用科学和温暖，认识真实的自己，拥抱多元的世界。
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">专业分析</h3>
          <p className="text-gray-600">
            基于心理学研究和性取向研究理论，提供专业的分析报告。
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
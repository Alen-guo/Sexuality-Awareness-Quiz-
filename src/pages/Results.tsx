import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface OrientationType {
  label: string;
  color: string;
  icon: string;
  shortDesc: string;
}

interface ResultData {
  score: number;
  orientationType: OrientationType;
  title: string;
  definition: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

const getOrientationType = (score: number): OrientationType => {
  if (score < 20) return { label: "异性恋 Heterosexual", color: "bg-blue-500", icon: "♂♀", shortDesc: "对异性产生情感或性吸引，是最常见的性取向。" };
  if (score < 40) return { label: "同性恋 Homosexual", color: "bg-red-500", icon: "♂♂/♀♀", shortDesc: "对同性产生情感或性吸引，包括男同和女同。" };
  if (score < 55) return { label: "双性恋 Bisexual", color: "bg-purple-500", icon: "⚥", shortDesc: "对两性均可能产生吸引。" };
  if (score < 65) return { label: "泛性恋 Pansexual", color: "bg-orange-400", icon: "🌈", shortDesc: "吸引力不基于性别，涵盖多元群体。" };
  if (score < 75) return { label: "灰性恋 Graysexual", color: "bg-gray-400", icon: "🌫️", shortDesc: "性吸引力微弱或不稳定。" };
  if (score < 85) return { label: "无性恋 Asexual", color: "bg-teal-500", icon: "⚪", shortDesc: "缺乏性欲望，但可能有浪漫情感需求。" };
  if (score < 90) return { label: "跨性别恋 Skoliosexual", color: "bg-green-500", icon: "⚧", shortDesc: "对跨性别或非二元性别者产生吸引。" };
  if (score < 95) return { label: "恋物性取向 Objectum Sexuality", color: "bg-yellow-800", icon: "🏛️", shortDesc: "对无生命物体产生吸引。" };
  return { label: "智性恋 Sapiosexual", color: "bg-yellow-400", icon: "🧠", shortDesc: "以智力为吸引核心。" };
};

const orientationColorCards = [
  { min: 0, max: 19, label: "异性恋 Heterosexual", color: "bg-blue-500", icon: "♂♀" },
  { min: 20, max: 39, label: "同性恋 Homosexual", color: "bg-red-500", icon: "♂♂/♀♀" },
  { min: 40, max: 54, label: "双性恋 Bisexual", color: "bg-purple-500", icon: "⚥" },
  { min: 55, max: 64, label: "泛性恋 Pansexual", color: "bg-orange-400", icon: "🌈" },
  { min: 65, max: 74, label: "灰性恋 Graysexual", color: "bg-gray-400", icon: "🌫️" },
  { min: 75, max: 84, label: "无性恋 Asexual", color: "bg-teal-500", icon: "⚪" },
  { min: 85, max: 89, label: "跨性别恋 Skoliosexual", color: "bg-green-500", icon: "⚧" },
  { min: 90, max: 94, label: "恋物性取向 Objectum Sexuality", color: "bg-yellow-800", icon: "🏛️" },
  { min: 95, max: 100, label: "智性恋 Sapiosexual", color: "bg-yellow-400", icon: "🧠" },
];

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { score: number };
  const score = state?.score || 0;
  const orientationType = getOrientationType(score);

  const getResultData = (score: number): ResultData => {
    return {
      score,
      orientationType,
      title: orientationType.label,
      definition: orientationType.shortDesc,
      description: orientationType.shortDesc,
      characteristics: ["请参考上方标签描述，结合自身体验理解。"],
      recommendations: ["保持自我认同，尊重多元，积极探索自我。"],
    };
  };

  const result = getResultData(score);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">
            你的测试结果
          </h1>

          {/* 醒目的性取向类型标签 */}
          <div className="flex flex-col items-center mb-8">
            <div className={`flex items-center justify-center text-white text-2xl font-bold px-8 py-4 rounded-full shadow-lg mb-2 ${orientationType.color}`}>
              <span className="mr-3 text-3xl">{orientationType.icon}</span>
              {orientationType.label}
            </div>
            <div className="text-gray-700 text-lg mt-2 font-semibold">{orientationType.shortDesc}</div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">类型定义</h2>
            <p className="text-gray-700 mb-2 font-medium">{result.definition}</p>
            
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">主要特征</h3>
            <ul className="space-y-2">
              {result.characteristics.map((char, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  {char}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">生活建议</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* 性取向类型色卡对照表 */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-center text-purple-700">性取向类型色卡对照表</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
              {orientationColorCards.map(card => {
                const isCurrent = result.orientationType.label === card.label;
                return (
                  <div
                    key={card.label}
                    className={`flex items-center p-4 rounded-lg shadow-md transition-all
                      ${card.color} text-white text-lg font-semibold
                      ${isCurrent ? 'ring-4 ring-purple-400 scale-105' : 'opacity-80'}`}
                  >
                    <span className="mr-3 text-2xl">{card.icon}</span>
                    <div>
                      <div>{card.label}</div>
                      {isCurrent && (
                        <div className="text-xs mt-1 font-bold text-yellow-200">← 你的类型</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate('/test')}
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              重新测试
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              保存结果
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results; 
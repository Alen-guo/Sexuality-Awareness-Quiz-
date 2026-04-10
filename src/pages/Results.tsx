import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RadarChart from '../components/RadarChart';
import { useI18n, useLanguage } from '../contexts/LanguageContext';

interface OrientationType {
  label: string;
  color: string;
  icon: string;
  key: string;
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
  if (score < 20) return { label: "异性恋 Heterosexual", color: "bg-blue-500", icon: "♂♀", key: "heterosexual" };
  if (score < 40) return { label: "同性恋 Homosexual", color: "bg-red-500", icon: "♂♂/♀♀", key: "homosexual" };
  if (score < 55) return { label: "双性恋 Bisexual", color: "bg-purple-500", icon: "⚥", key: "bisexual" };
  if (score < 65) return { label: "泛性恋 Pansexual", color: "bg-orange-400", icon: "🌈", key: "pansexual" };
  if (score < 75) return { label: "灰性恋 Graysexual", color: "bg-gray-400", icon: "🌫️", key: "graysexual" };
  if (score < 85) return { label: "无性恋 Asexual", color: "bg-teal-500", icon: "⚪", key: "asexual" };
  if (score < 90) return { label: "跨性别恋 Skoliosexual", color: "bg-green-500", icon: "⚧", key: "skoliosexual" };
  if (score < 95) return { label: "恋物性取向 Objectum Sexuality", color: "bg-yellow-800", icon: "🏛️", key: "objectum" };
  return { label: "智性恋 Sapiosexual", color: "bg-yellow-400", icon: "🧠", key: "sapiosexual" };
};

const orientationColorCards = [
  { key: 'heterosexual', min: 0, max: 19, label: { zh: '异性恋', en: 'Heterosexual' }, color: "bg-blue-500", icon: "♂♀" },
  { key: 'homosexual', min: 20, max: 39, label: { zh: '同性恋', en: 'Homosexual' }, color: "bg-red-500", icon: "♂♂/♀♀" },
  { key: 'bisexual', min: 40, max: 54, label: { zh: '双性恋', en: 'Bisexual' }, color: "bg-purple-500", icon: "⚥" },
  { key: 'pansexual', min: 55, max: 64, label: { zh: '泛性恋', en: 'Pansexual' }, color: "bg-orange-400", icon: "🌈" },
  { key: 'graysexual', min: 65, max: 74, label: { zh: '灰性恋', en: 'Graysexual' }, color: "bg-gray-400", icon: "🌫️" },
  { key: 'asexual', min: 75, max: 84, label: { zh: '无性恋', en: 'Asexual' }, color: "bg-teal-500", icon: "⚪" },
  { key: 'skoliosexual', min: 85, max: 89, label: { zh: '跨性别恋', en: 'Skoliosexual' }, color: "bg-green-500", icon: "⚧" },
  { key: 'objectum', min: 90, max: 94, label: { zh: '恋物性取向', en: 'Objectum Sexuality' }, color: "bg-yellow-800", icon: "🏛️" },
  { key: 'sapiosexual', min: 95, max: 100, label: { zh: '智性恋', en: 'Sapiosexual' }, color: "bg-yellow-400", icon: "🧠" },
];

const Results: React.FC = () => {
  const t = useI18n();
  const { lang } = useLanguage() as { lang: 'zh' | 'en', toggleLang: () => void };
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { scores: { attraction: number, relationship: number, identity: number }, answers: number[], radarData?: { name: string, value: number }[], primaryType?: string } | null;

  // 所有 hooks 必须在 early return 之前声明（React Rules of Hooks）
  const [locationInfo, setLocationInfo] = useState<{city: string, region: string} | null>(null);
  const [safetyScore, setSafetyScore] = useState<number | null>(null);
  const [cardModal, setCardModal] = useState<null | OrientationType>(null);

  // 进入结果页时强制滚到顶部（兼容微信/百度等手机浏览器）
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!state) return;
    // 获取地理位置（这里只用IP地理位置API模拟，实际可接入更权威服务）
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocationInfo({ city: data.city, region: data.region });
        // 模拟数据：不同地区可自定义
        // 这里用中国大陆为例
        let lawIndex = 40; // 反歧视法律指数（0-100）
        let crimeRate = 30; // LGBTQ+相关犯罪率（0-100，越高越危险）
        if (data.country_code === 'CN') {
          if (data.region === '广东省') { lawIndex = 55; crimeRate = 20; }
          if (data.region === '北京市') { lawIndex = 60; crimeRate = 15; }
          if (data.region === '新疆维吾尔自治区') { lawIndex = 20; crimeRate = 60; }
        }
        // 计算安全指数
        const score = Math.round(lawIndex * 0.6 + crimeRate * (-0.3) + 50); // +50保证基线
        setSafetyScore(Math.max(0, Math.min(100, score)));
      })
      .catch(() => {
        setLocationInfo({ city: '未知城市', region: '未知地区' });
        setSafetyScore(60); // 默认值
      });
  }, []);

  // 没有 state（刷新页面 / 直接访问 URL）时，引导回测试页
  // 必须放在所有 hooks 之后
  if (!state) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center">
        <p className="text-gray-500 mb-6 text-lg">请先完成测试再查看结果。</p>
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          onClick={() => navigate('/test')}
        >
          开始测试
        </button>
      </div>
    );
  }

  // 优先用primaryType（radarData最高项英文key）作为主类型
  let orientationType: OrientationType;
  if (state.primaryType) {
    const card = orientationColorCards.find(card => card.key === state.primaryType);
    if (card) {
      orientationType = {
        label: card.label[lang as 'zh' | 'en'],
        color: card.color,
        icon: card.icon,
        key: card.key,
      };
    } else {
      orientationType = getOrientationType(Math.round((state.scores?.attraction ?? 0) * 100));
    }
  } else {
    orientationType = getOrientationType(Math.round((state.scores?.attraction ?? 0) * 100));
  }

  const getResultData = (score: number): ResultData => {
    return {
      score,
      orientationType,
      title: orientationType.label,
      definition: t.results.typeDesc[orientationType.key as keyof typeof t.results.typeDesc] || '',
      description: t.results.typeDesc[orientationType.key as keyof typeof t.results.typeDesc] || '',
      characteristics: t.results.characteristics[orientationType.key as keyof typeof t.results.characteristics] || ["请参考上方标签描述，结合自身体验理解。"],
      recommendations: t.results.recommendations[orientationType.key as keyof typeof t.results.recommendations] || ["保持自我认同，尊重多元，积极探索自我。"],
    };
  };

  const result = getResultData(Math.round((state?.scores?.attraction ?? 0) * 100));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-6 rounded">
          {t.results.warning}
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">
            {t.results.title}
          </h1>

          {/* 醒目的性取向类型标签 */}
          <div className="flex flex-col items-center mb-8">
            <div className={`flex items-center justify-center text-white text-2xl font-bold px-8 py-4 rounded-full shadow-lg mb-2 ${result.orientationType.color}`}>
              <span className="mr-3 text-3xl">{result.orientationType.icon}</span>
              {result.orientationType.label}
            </div>
            <div className="text-gray-700 text-lg mt-2 font-semibold">{(t.results.typeDesc as any)[result.orientationType.key]}</div>
          </div>

          {/* 性取向雷达图可视化 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">{t.results.radarTitle}</h3>
            <RadarChart
              data={state.radarData || []}
              typeMap={t.test.typeLabels}
            />
            <div className="text-gray-500 text-xs text-center mt-2">{t.results.radarNote}</div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{t.results.typeDef}</h2>
            <p className="text-gray-700 mb-2 font-medium">{result.definition}</p>
          </div>

          {/* 名人名事/小故事板块 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{t.results.story}</h3>
            <StoryHighlight orientationType={result.orientationType} />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{t.results.features}</h3>
            <ul className="space-y-4">
              {result.characteristics.map((char, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div className="flex-1">
                    {char.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className="mb-2">{line}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{t.results.advice}</h3>
            <ul className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <div className="flex-1">
                    {rec.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className="mb-2">{line}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 性取向类型色卡对照表 */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-center text-purple-700">{t.results.colorCard}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
              {orientationColorCards.map(card => {
                const isCurrent = result.orientationType.label === card.label[lang as 'zh' | 'en'];
                return (
                  <button
                    key={card.key}
                    className={`flex items-center p-4 rounded-lg shadow-md transition-all w-full
                      ${card.color} text-white text-lg font-semibold
                      ${isCurrent ? 'ring-4 ring-purple-400 scale-105' : 'opacity-80'}
                      active:scale-95 focus:outline-none`}
                    onClick={() => setCardModal({
                      label: card.label[lang as 'zh' | 'en'],
                      color: card.color,
                      icon: card.icon,
                      key: card.key,
                    })}
                    type="button"
                    aria-label={t.results.viewTypeIntro.replace('{type}', card.label[lang as 'zh' | 'en'])}
                  >
                    <span className="mr-3 text-2xl">{card.icon}</span>
                    <div>
                      <div>{card.label[lang as 'zh' | 'en']}</div>
                      {isCurrent && (
                        <div className="text-xs mt-1 font-bold text-yellow-200">{t.results.yourType}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 色卡简介弹窗 */}
          {cardModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2" onClick={() => setCardModal(null)}>
              <div
                className="bg-white rounded-xl shadow-2xl max-w-xs w-full p-6 relative animate-fadeIn"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-purple-600 text-2xl font-bold focus:outline-none"
                  onClick={() => setCardModal(null)}
                  aria-label={t.results.close}
                >×</button>
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">{cardModal.icon}</span>
                  <div className="text-lg font-bold mb-1">{cardModal.label}</div>
                  <div className="text-gray-700 text-base whitespace-pre-line text-center">{(t.results.typeDesc as any)[cardModal.key]}</div>
                </div>
              </div>
            </div>
          )}

          {/* 平行世界故事线 */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">{t.results.storyLine}</h2>
            <div className="grid gap-6">
              <StoryCard
                title={t.results.story1}
                content={(t.results.storyLines.suppressed as any)[result.orientationType.key]}
              />
              <StoryCard
                title={t.results.story2}
                content={(t.results.storyLines.comingout as any)[result.orientationType.key]}
              />
              <StoryCard
                title={t.results.story3}
                content={(t.results.storyLines.fluidity as any)[result.orientationType.key]}
              />
            </div>
          </div>

          {/* 生存概率仪表盘 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">{t.results.dashboard}</h2>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="#f3f4f6" />
                  <path
                    d="M50 50 L50 10 A40 40 0 1 1 10 50 Z"
                    fill="#e5e7eb"
                  />
                  {/* 动态安全分数扇形 */}
                  {safetyScore !== null && (
                    <path
                      d={`M50 50 L50 10 A40 40 0 ${safetyScore > 50 ? 1 : 0} 1 ${50 + 40 * Math.sin(Math.PI * (safetyScore / 100))} ${50 - 40 * Math.cos(Math.PI * (safetyScore / 100))} Z`}
                      fill={safetyScore >= 70 ? '#22c55e' : safetyScore >= 40 ? '#facc15' : '#ef4444'}
                    />
                  )}
                  <circle cx="50" cy="50" r="30" fill="#fff" />
                  <text x="50" y="56" textAnchor="middle" fontSize="24" fill="#333" fontWeight="bold">
                    {safetyScore !== null ? safetyScore : '--'}
                  </text>
                  <text x="50" y="75" textAnchor="middle" fontSize="12" fill="#888">/100</text>
                </svg>
              </div>
              <div>
                <div className="text-lg font-semibold mb-1">
                  {locationInfo
                    ? t.results.locationDesc
                        .replace('{region}', locationInfo.region)
                        .replace('{city}', locationInfo.city)
                        .replace('{score}', (safetyScore !== null ? String(safetyScore) : t.results.scoreDefault))
                    : t.results.fetchingLocation}
                </div>
                <div className="text-gray-500 text-sm">{t.results.dashboardNote}</div>
              </div>
            </div>
          </div>

          {/* 资源神经网络图 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">{t.results.resource}</h2>
            <ResourceGraph orientationType={result.orientationType} />
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/test')}
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              {t.results.retest}
            </button>
            {/* <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {t.results.save}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// StoryCard 组件（风险/机遇/建议的label也国际化）
const StoryCard = ({ title, content }: { title: string, content: { story: string[], risk: string, opportunity: string, suggestion: string } }) => {
  const t = useI18n();
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {content.story.map((para, idx) => (
        <p className="mb-2 text-gray-700" key={idx}>{para}</p>
      ))}
      <div className="mt-4 text-sm">
        <div className="mb-1"><span className="font-bold text-red-500">{t.results.storyLineLabels.risk}：</span>{content.risk}</div>
        <div className="mb-1"><span className="font-bold text-green-600">{t.results.storyLineLabels.opportunity}：</span>{content.opportunity}</div>
        <div><span className="font-bold text-blue-600">{t.results.storyLineLabels.suggestion}：</span>{content.suggestion}</div>
      </div>
    </div>
  );
};

// 资源神经网络图组件
const ResourceGraph = ({ orientationType }: { orientationType: OrientationType }) => {
  const t = useI18n();
  const { lang } = useLanguage() as { lang: 'zh' | 'en' };
  const map = t.results.resourceMap[orientationType.key as keyof typeof t.results.resourceMap];
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex flex-col items-center">
        <div className="font-bold mb-1">{t.results.resourceLabels.concept}</div>
        <div className="bg-blue-100 border-blue-400 px-4 py-2 rounded-full border-2 font-semibold shadow-sm">{map.concept}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold mb-1">{t.results.resourceLabels.paper}</div>
        <div className="bg-green-100 border-green-400 px-4 py-2 rounded-full border-2 font-semibold shadow-sm">{map.paper}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold mb-1">{t.results.resourceLabels.org}</div>
        <div className="bg-yellow-100 border-yellow-400 px-4 py-2 rounded-full border-2 font-semibold shadow-sm">{map.org}</div>
      </div>
    </div>
  );
};

const StoryHighlight = ({ orientationType }: { orientationType: OrientationType }) => {
  const t = useI18n();
  return <div className="text-gray-700 text-base">{t.results.storyHighlight[orientationType.key as keyof typeof t.results.storyHighlight]}</div>;
};

const StoryLines = ({ orientationType, mode }: { orientationType: OrientationType, mode: 'suppressed' | 'comingout' | 'fluidity' }) => {
  const t = useI18n();
  const lang = (useLanguage() as { lang: 'zh' | 'en' }).lang;
  const data = t.results.storyLines[mode][orientationType.key as keyof typeof t.results.storyLines[typeof mode]];
  return (
    <div className="mb-6">
      <div className="font-bold mb-2">{t.results.storyLineLabels[mode]}</div>
      {data.story.map((s: string, i: number) => <p key={i} className="mb-1">{s}</p>)}
      <div className="text-sm text-red-500 mt-2">{t.results.storyLineLabels.risk}: {data.risk}</div>
      <div className="text-sm text-green-600">{t.results.storyLineLabels.opportunity}: {data.opportunity}</div>
      <div className="text-sm text-blue-600">{t.results.storyLineLabels.suggestion}: {data.suggestion}</div>
    </div>
  );
};

export default Results; 
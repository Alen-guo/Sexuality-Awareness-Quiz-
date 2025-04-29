import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const orientationGroups = [
  {
    group: '主流取向',
    bg: 'bg-purple-100',
    titleColor: 'text-purple-200',
    types: [
      {
        key: 'heterosexual',
        label: '异性恋 Heterosexual',
        icon: '♂♀',
        color: 'bg-blue-500',
        desc: '对异性产生情感或性吸引，是最常见的性取向。',
        detail: {
          definition: '对异性产生情感、浪漫及性吸引，占全球人口多数。',
          challenges: ['需注意避免对其他性取向群体的隐性歧视'],
          misunderstandings: ['异性恋是唯一"正常"的性取向'],
          recommendations: ['认知主流身份带来的社会特权，主动学习LGBTQ+知识以消除偏见。', '避免使用"正常/不正常"等标签化语言，尊重他人自我认同。', '在职场/社群中推动性别中立政策，营造包容环境。'],
        },
      },
      {
        key: 'homosexual',
        label: '同性恋 Homosexual',
        icon: '♂♂/♀♀',
        color: 'bg-red-500',
        desc: '对同性产生情感或性吸引，包括男同和女同。',
        detail: {
          definition: '对同性产生吸引，包括男同（Gay）和女同（Lesbian）。',
          challenges: ['面临家庭压力、职场歧视及法律权益缺失'],
          misunderstandings: ['同性恋是心理疾病或"选择"', '同性恋者不适合家庭生活'],
          recommendations: ['参与支持性社群，减少孤立感。', '了解相关法律权益，保护自身隐私。', '谨慎选择出柜时机，优先与信任的亲友沟通。'],
        },
      },
      {
        key: 'bisexual',
        label: '双性恋 Bisexual',
        icon: '⚥',
        color: 'bg-purple-500',
        desc: '对两性均可能产生吸引。',
        detail: {
          definition: '对两性均可能产生吸引，但吸引程度可能偏向某一性别。',
          challenges: ['常遭遇"双性恋不存在"或"滥交"等刻板印象'],
          misunderstandings: ['双性恋者不忠诚'],
          recommendations: ['明确自身需求，避免因外界压力强迫自己"选择一方"。', '参与双性恋专项支持小组，减少身份质疑。'],
        },
      },
      {
        key: 'pansexual',
        label: '泛性恋 Pansexual',
        icon: '🌈',
        color: 'bg-orange-400',
        desc: '吸引力不基于性别，涵盖多元群体。',
        detail: {
          definition: '吸引力不基于性别，涵盖跨性别、非二元性别等群体。',
          challenges: ['泛性恋常被误解为"双性恋"'],
          misunderstandings: ['泛性恋者没有界限'],
          recommendations: ['主动解释"泛性恋"与"双性恋"的区别，减少混淆。', '参与性别多元活动，拓展支持网络。'],
        },
      },
      {
        key: 'graysexual',
        label: '灰性恋 Graysexual',
        icon: '🌫️',
        color: 'bg-gray-400',
        desc: '性吸引力微弱或不稳定。',
        detail: {
          definition: '性吸引力微弱或不稳定，介于有性恋与无性恋之间。',
          challenges: ['易被忽视，缺乏针对性支持资源'],
          misunderstandings: ['灰性恋者只是"性冷淡"'],
          recommendations: ['通过日记追踪性吸引波动规律，增强自我认知。', '在亲密关系中明确"偶尔需要独处"的需求。'],
        },
      },
      {
        key: 'asexual',
        label: '无性恋 Asexual',
        icon: '⚪',
        color: 'bg-teal-500',
        desc: '缺乏性欲望，但可能有浪漫情感需求。',
        detail: {
          definition: '缺乏性欲望，但可能有浪漫情感需求。',
          challenges: ['常被误认为"性冷淡"或心理疾病'],
          misunderstandings: ['无性恋者不需要亲密关系'],
          recommendations: ['在亲密关系中明确表达无性倾向，避免伴侣误解。', '通过艺术创作、学术研究等非性领域实现自我价值。'],
        },
      },
      {
        key: 'skoliosexual',
        label: '跨性别恋 Skoliosexual',
        icon: '⚧',
        color: 'bg-green-500',
        desc: '对跨性别或非二元性别者产生吸引。',
        detail: {
          definition: '对跨性别者、非二元性别者产生吸引。',
          challenges: ['可能被质疑"物化跨性别群体"'],
          misunderstandings: ['跨性别恋者只是猎奇'],
          recommendations: ['避免使用"跨性别者更有魅力"等概括性语言，强调个体独特性。'],
        },
      },
      {
        key: 'objectum',
        label: '恋物性取向 Objectum Sexuality',
        icon: '🏛️',
        color: 'bg-yellow-800',
        desc: '对无生命物体产生吸引。',
        detail: {
          definition: '对无生命物体（如建筑、机器）产生情感或性吸引。',
          challenges: ['常被病理化，需区分"非伤害性偏好"与心理障碍'],
          misunderstandings: ['恋物性取向者无法与人建立关系'],
          recommendations: ['确保行为不侵犯他人财产权，避免公共场合过度亲密接触物体。'],
        },
      },
      {
        key: 'sapiosexual',
        label: '智性恋 Sapiosexual',
        icon: '🧠',
        color: 'bg-yellow-400',
        desc: '以智力为吸引核心。',
        detail: {
          definition: '以智力为吸引核心，常见于高学历群体。',
          challenges: ['可能陷入"智力优越感"，忽视情感互动重要性'],
          misunderstandings: ['智性恋者只看重智商'],
          recommendations: ['在交流中平衡智力话题与情感表达，避免让对方感到被评判。'],
        },
      },
    ],
  },
  // {
  //   group: '多元取向',
  //   bg: 'bg-green-100',
  //   titleColor: 'text-green-200',
  //   types: [
      
  //   ],
  // },
  // {
  //   group: '特殊取向',
  //   bg: 'bg-blue-100',
  //   titleColor: 'text-blue-200',
  //   types: [
      
  //   ],
  // },
];

const TypeDetailModal = ({ type, onClose }: { type: any; onClose: () => void }) => {
  if (!type) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`relative w-full max-w-lg rounded-2xl shadow-2xl p-8 ${type.color} text-white animate-fadeIn`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-white hover:text-yellow-200">×</button>
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{type.icon}</span>
          <span className="text-2xl font-bold drop-shadow-lg">{type.label}</span>
        </div>
        <div className="mb-3"><span className="font-semibold">类型定义：</span>{type.detail.definition}</div>
        <div className="mb-3"><span className="font-semibold">现状/挑战：</span><ul className="list-disc pl-6">{type.detail.challenges.map((c:string,i:number)=>(<li key={i}>{c}</li>))}</ul></div>
        <div className="mb-3"><span className="font-semibold">常见误解：</span><ul className="list-disc pl-6">{type.detail.misunderstandings.map((c:string,i:number)=>(<li key={i}>{c}</li>))}</ul></div>
        <div className="mb-3"><span className="font-semibold">生活建议：</span><ul className="list-disc pl-6">{type.detail.recommendations.map((c:string,i:number)=>(<li key={i}>{c}</li>))}</ul></div>
      </div>
    </div>
  );
};

const TypesOverview: React.FC = () => {
  const [selectedType, setSelectedType] = useState<any>(null);
  const { type } = useParams();
  const navigate = useNavigate();

  // 根据URL参数自动弹出模态框
  useEffect(() => {
    if (type) {
      const allTypes = orientationGroups.flatMap(g => g.types);
      const found = allTypes.find(t => t.key === type);
      setSelectedType(found || null);
    } else {
      setSelectedType(null);
    }
  }, [type]);

  // 关闭模态框时返回/types
  const handleClose = () => {
    setSelectedType(null);
    navigate('/types');
  };

  return (
    <div className="min-h-screen w-full">
      {orientationGroups.map((group) => (
        <section key={group.group} className={`${group.bg} py-16 relative`}>
          {/* 大标题半透明背景字 */}
          <h2 className={`absolute left-1/2 -translate-x-1/2 top-8 text-7xl font-extrabold opacity-20 select-none pointer-events-none ${group.titleColor} whitespace-nowrap z-0`}>{group.group}</h2>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8">
              {group.types.map(type => (
                <div
                  key={type.key}
                  className={`rounded-2xl shadow-lg p-8 flex flex-col items-center cursor-pointer transform hover:scale-105 transition-all ${type.color} bg-opacity-90 w-64 min-h-[260px]`}
                  onClick={() => navigate(`/types/${type.key}`)}
                >
                  <div className="text-5xl mb-4 drop-shadow-lg">{type.icon}</div>
                  <div className="text-xl font-bold mb-2 text-white drop-shadow-lg">{type.label}</div>
                  <div className="text-white text-center opacity-90 text-base">{type.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <TypeDetailModal type={selectedType} onClose={handleClose} />
    </div>
  );
};

export default TypesOverview; 
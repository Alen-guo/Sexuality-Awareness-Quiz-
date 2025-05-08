import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RadarChart from '../components/RadarChart';

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
  const state = location.state as { scores: { attraction: number, relationship: number, identity: number }, answers: number[], radarData?: { name: string, value: number }[], primaryType?: string };
  // 优先用primaryType（radarData最高项）作为主类型
  let orientationType: OrientationType;
  if (state.primaryType) {
    // 在orientationColorCards中查找label包含primaryType的项
    const card = orientationColorCards.find(card => card.label.includes(state.primaryType!));
    if (card) {
      orientationType = {
        label: card.label,
        color: card.color,
        icon: card.icon,
        shortDesc: getOrientationType(card.min).shortDesc
      };
    } else {
      // fallback
      orientationType = getOrientationType(Math.round((state?.scores?.attraction ?? 0) * 100));
    }
  } else {
    orientationType = getOrientationType(Math.round((state?.scores?.attraction ?? 0) * 100));
  }

  // 生存概率仪表盘相关状态
  const [locationInfo, setLocationInfo] = useState<{city: string, region: string} | null>(null);
  const [safetyScore, setSafetyScore] = useState<number | null>(null);
  const [cardModal, setCardModal] = useState<null | OrientationType>(null);

  useEffect(() => {
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

  const getResultData = (score: number): ResultData => {
    return {
      score,
      orientationType,
      title: orientationType.label,
      definition: orientationType.shortDesc,
      description: orientationType.shortDesc,
      characteristics:
        orientationType.label === '同性恋 Homosexual' ? [
          `1. 真实自我认同：同性恋者在成长过程中，往往需要经历自我认同的觉醒与接纳。这一过程可能伴随着自我怀疑、焦虑、甚至否定，但最终能够坦然面对自己的性取向，是极大的心理成长。研究显示，能够正视并接纳自身性取向的人，心理健康水平显著高于长期压抑自我的群体。
2. 情感表达的细腻与深刻：由于社会环境的影响，同性恋者在表达情感时往往更加谨慎和细腻。他们学会在复杂的社会关系中保护自己，同时也更能体察他人的情绪和需求。这种情感的敏感性，使得他们在亲密关系中能够建立更深层次的情感连接。
3. 社会适应与抗压能力：面对外部的偏见和歧视，同性恋者通常会发展出较强的社会适应能力和抗压能力。他们学会在不同的社交场合中调整自我表达方式，以保护自身安全和心理健康。
4. 多元文化的包容性：同性恋者在自我认同的过程中，往往会接触到多元的性别与性取向观念。这种多元文化的熏陶，使他们更容易接受和理解不同背景、不同观点的人，具备更强的包容心。
5. 创造力与自我表达：许多同性恋者在艺术、文学、设计等领域表现出较高的创造力。这与他们在成长过程中需要不断探索自我、突破社会框架密切相关。研究发现，LGBTQ+群体在创造性思维和自我表达方面具有独特优势。
6. 社群归属感与互助精神：同性恋者在寻找自我认同的过程中，往往会主动加入LGBTQ+社群。这些社群不仅提供情感支持和信息资源，还促进了成员之间的互助与团结。社群归属感有助于提升个体的幸福感和安全感。
7. 对社会公正的敏感度：由于自身经历过不公正待遇，同性恋者对社会公平和人权议题通常更加关注。他们更愿意参与公益活动，推动社会进步。
8. 亲密关系的忠诚与稳定：研究表明，许多同性恋伴侣在建立关系后，表现出高度的忠诚和稳定性。他们更重视情感的深度和质量，而非表面的形式。
9. 自我成长的动力：在面对社会压力和挑战时，同性恋者往往会激发出强烈的自我成长动力。他们不断学习、反思和提升自我，以适应不断变化的社会环境。
10. 生活方式的多样性：同性恋者在生活方式选择上更加多元和开放。他们勇于尝试新鲜事物，追求个性化的生活体验。`
        ] :
        orientationType.label === '双性恋 Bisexual' ? [
          `1. 双重吸引力的复杂体验：双性恋者能够同时对男性和女性产生情感或性吸引，这种双重吸引力带来了丰富的情感体验，但也可能伴随着身份认同的困惑。许多双性恋者在成长过程中会经历"自我质疑期"，不断思考自己的真实需求和归属感。
2. 身份流动性与灵活性：双性恋者的性取向具有一定的流动性，可能会随着时间、环境或情感经历发生变化。这种灵活性使他们更容易适应多变的社会关系，但也可能因外界的不理解而感到孤独。
3. 面临双重偏见：双性恋者常常既受到异性恋群体的质疑，也面临同性恋社群的误解。例如，"你只是过渡期"或"你不够坚定"等刻板印象，容易让双性恋者产生被边缘化的感受。
4. 情感表达的多样性：双性恋者在表达情感时，能够从不同性别的视角理解和体察伴侣的需求，这种多样性有助于建立更平等和包容的亲密关系。
5. 社群归属感的挑战：由于身份的特殊性，双性恋者在LGBTQ+社群中有时会感到"夹缝中生存"，难以找到完全的归属感。这促使他们更加主动地寻求同伴支持和认同。
6. 适应力与共情力：面对外界的误解和压力，双性恋者通常会发展出较强的适应能力和共情能力。他们能够理解不同性别、不同取向群体的处境，具备跨界沟通的优势。
7. 自我成长与反思：在不断探索自我认同的过程中，双性恋者会经历大量的自我反思和成长。他们学会接纳自己的多面性，勇于面对内心的矛盾与冲突。
8. 生活方式的多元选择：双性恋者在生活方式、兴趣爱好、社交圈层等方面表现出高度的多元性。他们乐于尝试新鲜事物，追求个性化的生活体验。
9. 对社会包容的推动作用：双性恋者在推动性别与性取向多元化方面具有独特的桥梁作用。他们能够连接不同群体，促进社会的理解与包容。
10. 情感忠诚与责任感：尽管外界常有"花心"或"不专一"的误解，许多双性恋者在亲密关系中表现出高度的忠诚和责任感，重视情感的深度和质量。`
        ] :
        orientationType.label === '泛性恋 Pansexual' ? [
          `1. 性别无关的吸引力：泛性恋者的情感和性吸引力不受性别限制，他们能够欣赏和爱上任何性别身份的人。这种开放性使他们在亲密关系中更注重个体特质而非性别标签。
2. 高度的包容性与多元视角：泛性恋者在成长过程中会接触到丰富的性别与性取向观念，具备极强的包容心和多元视角。他们能够理解和尊重各种身份认同，善于在多元文化中游刃有余。
3. 身份认同的流动性：泛性恋者的自我认同具有较强的流动性，能够适应不同阶段、不同环境下的情感需求。这种流动性有助于他们在复杂的社会关系中保持自我一致性。
4. 面临误解与标签化：由于社会对泛性恋的认知有限，泛性恋者常常被误解为"没有界限"或"混乱"。他们需要不断向外界解释自己的身份，争取理解和尊重。
5. 情感表达的自由度：泛性恋者在表达情感时更加自由和真实，不受传统性别角色的束缚。他们能够与伴侣建立平等、开放的亲密关系。
6. 社群归属感与支持网络：泛性恋者在LGBTQ+社群中逐渐建立起自己的支持网络，这些社群为他们提供情感支持、信息资源和归属感。
7. 创造力与创新思维：泛性恋者在艺术、科技、社会创新等领域表现出较高的创造力。他们善于打破常规，勇于探索未知领域。
8. 对社会多元化的推动：泛性恋者积极参与多元文化活动，推动社会对性别与性取向多样性的接纳和包容。
9. 自我成长与反思：在不断探索自我认同的过程中，泛性恋者会经历大量的自我反思和成长。他们学会接纳自己的多面性，勇于面对内心的矛盾与冲突。
10. 生活方式的多样性：泛性恋者在生活方式、兴趣爱好、社交圈层等方面表现出高度的多元性，乐于尝试新鲜事物，追求个性化的生活体验。`
        ] :
        orientationType.label === '无性恋 Asexual' ? [
          `1. 性吸引力的缺失或极低：无性恋者在情感和性吸引力方面表现出极低或缺失的倾向，这种特质并不影响他们建立深厚的情感关系。
2. 浪漫需求的多样性：无性恋者可能仍然有浪漫情感需求，能够与他人建立亲密的情感连接，但不以性为核心。
3. 面临误解与标签化：无性恋者常常被误解为"性冷淡"或"有心理问题"，需要不断向外界解释自己的身份。
4. 情感表达的细腻与深刻：无性恋者在表达情感时更加注重精神层面的交流，能够与伴侣建立深层次的情感连接。
5. 社群归属感与支持网络：无性恋者在LGBTQ+社群中逐渐建立起自己的支持网络，这些社群为他们提供情感支持、信息资源和归属感。
6. 自我认同的挑战与成长：无性恋者在自我认同的过程中，常常需要面对外界的质疑和自我怀疑，但最终能够坦然接纳自己的身份。
7. 对社会多元化的推动：无性恋者积极参与多元文化活动，推动社会对性别与性取向多样性的接纳和包容。
8. 生活方式的多样性：无性恋者在生活方式、兴趣爱好、社交圈层等方面表现出高度的多元性，乐于尝试新鲜事物，追求个性化的生活体验。
9. 情感忠诚与责任感：无性恋者在亲密关系中表现出高度的忠诚和责任感，重视情感的深度和质量。
10. 自我成长的动力：在面对社会压力和挑战时，无性恋者往往会激发出强烈的自我成长动力，不断学习、反思和提升自我。`
        ] :
        orientationType.label === '灰性恋 Graysexual' ? [
          `1. 性吸引力的波动性：灰性恋者的性吸引力处于有性恋与无性恋之间，表现出一定的波动性和不稳定性。
2. 情感需求的多样性：灰性恋者在情感需求上表现出多样性，能够与不同性别、不同取向的人建立亲密关系。
3. 面临误解与标签化：灰性恋者常常被误解为"性冷淡"或"有心理问题"，需要不断向外界解释自己的身份。
4. 情感表达的细腻与深刻：灰性恋者在表达情感时更加注重精神层面的交流，能够与伴侣建立深层次的情感连接。
5. 社群归属感与支持网络：灰性恋者在LGBTQ+社群中逐渐建立起自己的支持网络，这些社群为他们提供情感支持、信息资源和归属感。
6. 自我认同的挑战与成长：灰性恋者在自我认同的过程中，常常需要面对外界的质疑和自我怀疑，但最终能够坦然接纳自己的身份。
7. 对社会多元化的推动：灰性恋者积极参与多元文化活动，推动社会对性别与性取向多样性的接纳和包容。
8. 生活方式的多样性：灰性恋者在生活方式、兴趣爱好、社交圈层等方面表现出高度的多元性，乐于尝试新鲜事物，追求个性化的生活体验。
9. 情感忠诚与责任感：灰性恋者在亲密关系中表现出高度的忠诚和责任感，重视情感的深度和质量。
10. 自我成长的动力：在面对社会压力和挑战时，灰性恋者往往会激发出强烈的自我成长动力，不断学习、反思和提升自我。`
        ] :
        orientationType.label === '跨性别恋 Skoliosexual' ? [
          `1. 对跨性别或非二元性别者的吸引：跨性别恋者能够欣赏和爱上跨性别或非二元性别身份的人，这种吸引力体现了对性别多样性的高度包容。
2. 高度的包容性与多元视角：跨性别恋者在成长过程中会接触到丰富的性别与性取向观念，具备极强的包容心和多元视角。
3. 身份认同的流动性：跨性别恋者的自我认同具有较强的流动性，能够适应不同阶段、不同环境下的情感需求。
4. 面临误解与标签化：由于社会对跨性别恋的认知有限，跨性别恋者常常被误解为"猎奇"或"物化"。
5. 情感表达的自由度：跨性别恋者在表达情感时更加自由和真实，不受传统性别角色的束缚。
6. 社群归属感与支持网络：跨性别恋者在LGBTQ+社群中逐渐建立起自己的支持网络，这些社群为他们提供情感支持、信息资源和归属感。
7. 创造力与创新思维：跨性别恋者在艺术、科技、社会创新等领域表现出较高的创造力。
8. 对社会多元化的推动：跨性别恋者积极参与多元文化活动，推动社会对性别与性取向多样性的接纳和包容。
9. 自我成长与反思：在不断探索自我认同的过程中，跨性别恋者会经历大量的自我反思和成长。
10. 生活方式的多样性：跨性别恋者在生活方式、兴趣爱好、社交圈层等方面表现出高度的多元性。`
        ] :
        orientationType.label === '恋物性取向 Objectum Sexuality' ? [
          `1. 对无生命物体的情感或性吸引：恋物性取向者能够对建筑、机器等无生命物体产生情感或性吸引，这种特质并不影响他们与人建立深厚的情感关系。
2. 面临误解与标签化：恋物性取向者常常被误解为"怪异"或"有心理问题"，需要不断向外界解释自己的身份。
3. 情感表达的细腻与深刻：恋物性取向者在表达情感时更加注重精神层面的交流，能够与物体建立深层次的情感连接。
4. 社群归属感与支持网络：恋物性取向者在相关社群中逐渐建立起自己的支持网络，这些社群为他们提供情感支持、信息资源和归属感。
5. 自我认同的挑战与成长：恋物性取向者在自我认同的过程中，常常需要面对外界的质疑和自我怀疑，但最终能够坦然接纳自己的身份。
6. 对社会多元化的推动：恋物性取向者积极参与多元文化活动，推动社会对性别与性取向多样性的接纳和包容。
7. 生活方式的多样性：恋物性取向者在生活方式、兴趣爱好、社交圈层等方面表现出高度的多元性。
8. 情感忠诚与责任感：恋物性取向者在亲密关系中表现出高度的忠诚和责任感，重视情感的深度和质量。
9. 自我成长的动力：在面对社会压力和挑战时，恋物性取向者往往会激发出强烈的自我成长动力。
10. 创造力与自我表达：恋物性取向者在艺术、文学、设计等领域表现出较高的创造力。`
        ] :
        orientationType.label === '智性恋 Sapiosexual' ? [
          `1. 以智力为核心的吸引力：智性恋者在情感和性吸引力方面更看重对方的智力和思维方式，这种特质使他们在亲密关系中更注重精神层面的交流。
2. 高度的创造力与创新思维：智性恋者在艺术、科技、社会创新等领域表现出较高的创造力。
3. 面临误解与标签化：智性恋者常常被误解为"高冷"或"难以接近"，需要不断向外界解释自己的身份。
4. 情感表达的自由度：智性恋者在表达情感时更加自由和真实，不受传统性别角色的束缚。
5. 社群归属感与支持网络：智性恋者在相关社群中逐渐建立起自己的支持网络，这些社群为他们提供情感支持、信息资源和归属感。
6. 自我认同的挑战与成长：智性恋者在自我认同的过程中，常常需要面对外界的质疑和自我怀疑，但最终能够坦然接纳自己的身份。
7. 对社会多元化的推动：智性恋者积极参与多元文化活动，推动社会对性别与性取向多样性的接纳和包容。
8. 生活方式的多样性：智性恋者在生活方式、兴趣爱好、社交圈层等方面表现出高度的多元性。
9. 情感忠诚与责任感：智性恋者在亲密关系中表现出高度的忠诚和责任感，重视情感的深度和质量。
10. 自我成长的动力：在面对社会压力和挑战时，智性恋者往往会激发出强烈的自我成长动力，不断学习、反思和提升自我。`
        ] : ["请参考上方标签描述，结合自身体验理解。"],
      recommendations:
        orientationType.label === '同性恋 Homosexual' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] :
        orientationType.label === '双性恋 Bisexual' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] :
        orientationType.label === '泛性恋 Pansexual' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] :
        orientationType.label === '无性恋 Asexual' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] :
        orientationType.label === '灰性恋 Graysexual' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] :
        orientationType.label === '跨性别恋 Skoliosexual' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] :
        orientationType.label === '恋物性取向 Objectum Sexuality' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] :
        orientationType.label === '智性恋 Sapiosexual' ? [
          `1. 接纳自我，正视内心需求：无论外界如何评价，首先要学会接纳真实的自己。可以通过阅读LGBTQ+相关书籍、观看纪录片、参与线上线下社群等方式，逐步建立自信。
2. 寻找支持系统：主动结识志同道合的朋友，加入LGBTQ+社群或支持组织。在遇到困惑和压力时，及时向信任的人倾诉，避免情绪积压。
3. 关注心理健康：如果长期感到焦虑、抑郁或孤独，建议寻求专业心理咨询师的帮助。心理健康同样重要，不要忽视内心的声音。
4. 学会自我保护：在不安全的环境下，谨慎表达自己的性取向。可以提前了解相关法律政策，保护自身权益。
5. 提升沟通能力：在亲密关系中，坦诚沟通是维系感情的关键。学会表达自己的需求和感受，也要尊重伴侣的想法。
6. 参与公益与社会活动：通过参与LGBTQ+公益项目、志愿服务等方式，既能帮助他人，也能提升自我价值感。
7. 持续学习与成长：关注性别、性取向等领域的最新研究和社会动态，保持开放的心态，勇于接受新观点。
8. 规划未来生活：无论是职业发展还是家庭规划，都要根据自身实际情况做出理性选择。可以寻求专业人士的建议，制定切实可行的目标。
9. 培养兴趣爱好：丰富的兴趣爱好有助于缓解压力，提升生活幸福感。可以尝试艺术、运动、旅行等多种活动。
10. 关注法律与权益：了解本地及国际关于LGBTQ+的法律政策，积极维护自身合法权益。如遇到歧视或不公正待遇，勇敢寻求法律援助。`
        ] : ["保持自我认同，尊重多元，积极探索自我。"],
    };
  };

  const result = getResultData(Math.round((state?.scores?.attraction ?? 0) * 100));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-6 rounded">
          本测试结果仅供参考，性取向是流动且多元的自我认同，无法被简单定义。如需专业支持，请联系心理咨询师或LGBTQ+公益组织。(如有冒犯，请别当真，图一乐，哈哈哈笑过，祝您生活愉快)
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">
            你的测试结果
          </h1>

          {/* 醒目的性取向类型标签 */}
          <div className="flex flex-col items-center mb-8">
            <div className={`flex items-center justify-center text-white text-2xl font-bold px-8 py-4 rounded-full shadow-lg mb-2 ${result.orientationType.color}`}>
              <span className="mr-3 text-3xl">{result.orientationType.icon}</span>
              {result.orientationType.label}
            </div>
            <div className="text-gray-700 text-lg mt-2 font-semibold">{result.orientationType.shortDesc}</div>
          </div>

          {/* 性取向雷达图可视化 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">性取向类型占比雷达图</h3>
            <RadarChart
              data={state.radarData || []}
            />
            <div className="text-gray-500 text-xs text-center mt-2">本图基于你每道题的真实作答，反映多维性取向倾向</div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">类型定义</h2>
            <p className="text-gray-700 mb-2 font-medium">{result.definition}</p>
          </div>

          {/* 名人名事/小故事板块 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">名人名事 / 小故事</h3>
            <StoryHighlight orientationType={result.orientationType} />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">主要特征</h3>
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
            <h3 className="text-xl font-semibold mb-4">生活建议</h3>
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
            <h3 className="text-xl font-bold mb-4 text-center text-purple-700">性取向类型色卡对照表</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
              {orientationColorCards.map(card => {
                const isCurrent = result.orientationType.label === card.label;
                return (
                  <button
                    key={card.label}
                    className={`flex items-center p-4 rounded-lg shadow-md transition-all w-full
                      ${card.color} text-white text-lg font-semibold
                      ${isCurrent ? 'ring-4 ring-purple-400 scale-105' : 'opacity-80'}
                      active:scale-95 focus:outline-none`}
                    onClick={() => setCardModal({
                      label: card.label,
                      color: card.color,
                      icon: card.icon,
                      shortDesc: getOrientationType(card.min).shortDesc
                    })}
                    type="button"
                    aria-label={`查看${card.label}简介`}
                  >
                    <span className="mr-3 text-2xl">{card.icon}</span>
                    <div>
                      <div>{card.label}</div>
                      {isCurrent && (
                        <div className="text-xs mt-1 font-bold text-yellow-200">← 你的类型</div>
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
                  aria-label="关闭"
                >×</button>
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">{cardModal.icon}</span>
                  <div className="text-lg font-bold mb-1">{cardModal.label}</div>
                  <div className="text-gray-500 text-sm mb-2">{cardModal.label.split(' ')[1]}</div>
                  <div className="text-gray-700 text-base whitespace-pre-line text-center">{cardModal.shortDesc}</div>
                </div>
              </div>
            </div>
          )}

          {/* 平行世界故事线 */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">平行世界故事线</h2>
            <div className="grid gap-6">
              <StoryCard 
                title="压抑身份的人生轨迹" 
                content={genSuppressedStory(result.orientationType)} 
              />
              <StoryCard 
                title="公开出柜的社会成本计算器" 
                content={genComingOutCostStory(result.orientationType)} 
              />
              <StoryCard 
                title="性取向流动的可能性沙盘" 
                content={genFluidityStory(result.orientationType)} 
              />
            </div>
          </div>

          {/* 生存概率仪表盘 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">生存概率仪表盘</h2>
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
                  {locationInfo ? `在${locationInfo.region}${locationInfo.city}公开性取向的安全指数为${safetyScore ?? '--'}/100` : '正在获取地理位置...'}
                </div>
                <div className="text-gray-500 text-sm">（指数仅供参考，综合反歧视法律与LGBTQ+犯罪率模拟计算）</div>
              </div>
            </div>
          </div>

          {/* 资源神经网络图 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">资源神经网络图</h2>
            <ResourceGraph orientationType={result.orientationType} />
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/test')}
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              重新测试
            </button>
            {/* <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              保存结果
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// StoryCard 组件和故事生成函数
const StoryCard = ({ title, content }: { title: string, content: { story: string[], risk: string, opportunity: string, suggestion: string } }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {content.story.map((para, idx) => (
      <p className="mb-2 text-gray-700" key={idx}>{para}</p>
    ))}
    <div className="mt-4 text-sm">
      <div className="mb-1"><span className="font-bold text-red-500">风险：</span>{content.risk}</div>
      <div className="mb-1"><span className="font-bold text-green-600">机遇：</span>{content.opportunity}</div>
      <div><span className="font-bold text-blue-600">建议：</span>{content.suggestion}</div>
    </div>
  </div>
);

function genSuppressedStory(orientationType: any) {
  switch (orientationType.label) {
    case '同性恋 Homosexual':
      return {
        story: [
          '你选择了隐藏真实的自我，试图融入主流社会。你可能会与异性结婚，努力扮演传统角色，但内心始终有一块无法填补的空白。',
          '在亲密关系中，你常常感到孤独和疏离，难以与伴侣建立真正的情感连接。',
          '你可能会在夜深人静时怀疑自我价值，甚至陷入抑郁或焦虑。',
        ],
        risk: '长期压抑自我可能导致心理健康问题，甚至影响身体健康。过度情感劳动（如照顾他人情绪而压抑自我）可能导致慢性疲劳。',
        opportunity: '你会发展出强大的自我保护机制和同理心，对他人的困境更为敏感。部分研究表明，同性恋者在成长过程中因长期面临社会偏见，可能发展出更高的情绪觉察能力（Hatzenbuehler, 2011）。接触多元性别观念的同性恋者，在解决矛盾信息时表现出更强的认知重构能力（Riggle et al., 2017）',
        suggestion: '建议寻求LGBTQ+友善的心理咨询，逐步探索自我认同的安全表达方式。定期进行"情绪审计"，使用日记记录何时为自我需求发声、何时为适应他人妥协。',
      };
    case '双性恋 Bisexual':
      return {
        story: [
          '你选择只展现对异性的吸引，隐藏对同性的情感。你可能会不断自我质疑，担心被贴上"摇摆不定"的标签。',
          '在社交场合，你小心翼翼地管理言行，避免暴露真实倾向。',
          '你可能会错失与真正理解你的朋友或伴侣建立深层关系的机会。',
        ],
        risk: '长期否认自我会加剧孤独感，影响亲密关系的质量。',
        opportunity: '你会锻炼出强大的适应能力和多元视角。',
        suggestion: '建议加入双性恋支持小组，倾诉真实感受，获得同伴力量。',
      };
    case '泛性恋 Pansexual':
      return {
        story: [
          '你在多元吸引力中选择了"隐身"，避免谈论自己的真实感受。',
          '你可能会在不同社交圈中切换身份，始终保持警惕。',
          '你对自我认同的流动性产生怀疑，担心被误解为"没有界限"。',
        ],
        risk: '长期自我否定会导致身份混乱和自尊受损。',
        opportunity: '你会更理解多元群体的困境，成为包容的倾听者。',
        suggestion: '建议主动学习性别多元知识，逐步建立自信。',
      };
    case '无性恋 Asexual':
      return {
        story: [
          '你选择顺应社会对"正常"欲望的期待，假装自己有性吸引力。',
          '你可能会强迫自己进入不适合的亲密关系，感到困惑和压力。',
          '你在自我认同和外界期待之间反复拉扯。',
        ],
        risk: '违背内心的选择会导致长期焦虑和自我否定。',
        opportunity: '你会发展出对自我需求的敏锐觉察力。',
        suggestion: '建议寻找无性恋社群，交流真实体验，获得认同感。',
      };
    default:
      return {
        story: [
          '你选择了顺应主流，隐藏了部分真实自我。',
          '你可能会获得表面的安稳，但内心始终有未被满足的渴望。',
          '你在自我认同和社会期待之间反复权衡。',
        ],
        risk: '长期压抑会影响幸福感和心理健康。',
        opportunity: '你会更理解他人的挣扎，具备同理心。',
        suggestion: '建议多与值得信赖的朋友交流，逐步探索自我表达的空间。',
      };
  }
}

function genComingOutCostStory(orientationType: any) {
  switch (orientationType.label) {
    case '同性恋 Homosexual':
      return {
        story: [
          '你决定向家人和朋友公开身份，最初可能会遭遇不解甚至排斥。',
          '在职场和公共场合，你需要权衡是否出柜带来的风险。',
          '随着时间推移，你可能会结识更多志同道合的朋友，获得社群支持。',
        ],
        risk: '可能面临家庭关系紧张、职场歧视等现实压力。',
        opportunity: '你有机会建立真实的亲密关系，获得自我认同的自由。',
        suggestion: '建议评估自身环境，选择安全的出柜时机，寻求LGBTQ+组织的帮助。',
      };
    case '双性恋 Bisexual':
      return {
        story: [
          '你向亲友坦白自己的双重吸引力，可能会被误解为"贪心"或"不专一"。',
          '你需要不断解释自己的身份，争取理解和尊重。',
          '你会在社群中找到归属感，逐渐建立自信。',
        ],
        risk: '可能遭遇双重歧视，既来自异性恋群体，也来自同性恋群体。',
        opportunity: '你能成为桥梁，促进不同群体间的理解。',
        suggestion: '建议加入双性恋社群，积累正向经验，提升自我认同。',
      };
    case '泛性恋 Pansexual':
      return {
        story: [
          '你公开了对所有性别的吸引力，身边的人可能一时难以理解。',
          '你需要花时间科普"泛性恋"与"混乱"的区别。',
          '你会遇到更多多元化的朋友，拓展视野。',
        ],
        risk: '可能被贴上"没有界限"的标签，遭遇误解。',
        opportunity: '你能成为性别多元的倡导者，推动社会包容。',
        suggestion: '建议积极参与多元社群活动，提升自信和影响力。',
      };
    case '无性恋 Asexual':
      return {
        story: [
          '你选择坦然表达自己的无性倾向，部分人可能无法理解你的需求。',
          '你需要与伴侣或亲友反复沟通，争取被尊重。',
          '你会在无性恋社群中找到共鸣和支持。',
        ],
        risk: '可能被误解为"冷淡"或"有问题"，影响亲密关系。',
        opportunity: '你能帮助更多人理解无性恋，减少偏见。',
        suggestion: '建议参与无性恋公益项目，扩大影响力。',
      };
    default:
      return {
        story: [
          '你选择了在合适的时机表达真实自我。',
          '你会经历一定的社会压力，但也会收获理解和支持。',
          '你逐步建立起自信和归属感。',
        ],
        risk: '可能面临误解和短期压力。',
        opportunity: '你能获得更真实的关系和自我成长。',
        suggestion: '建议循序渐进，选择信任的人分享自我。',
      };
  }
}

function genFluidityStory(orientationType: any) {
  switch (orientationType.label) {
    case '同性恋 Homosexual':
      return {
        story: [
          '你发现自己的情感和性吸引力会随时间和环境发生微妙变化。',
          '你可能会对不同性别的人产生好感，逐步理解性取向的流动性。',
          '你学会接纳自我，不再用标签限制身份。',
        ],
        risk: '身份流动期可能带来自我怀疑和外界质疑。',
        opportunity: '你能体验更丰富的人际关系和自我成长。',
        suggestion: '建议记录自我变化，保持开放心态，勇于探索。',
      };
    case '双性恋 Bisexual':
      return {
        story: [
          '你体验到性取向的多样性，发现吸引力会随情境变化。',
          '你逐渐摆脱"必须选边站"的压力，享受身份的自由。',
          '你在多元社群中找到归属感，结识志同道合的朋友。',
        ],
        risk: '流动性可能被误解为"不坚定"或"混乱"。',
        opportunity: '你能成为多元包容的典范，影响他人。',
        suggestion: '建议多与同伴交流，分享流动性的积极体验。',
      };
    case '泛性恋 Pansexual':
      return {
        story: [
          '你发现吸引力不再受性别限制，体验到人与人之间的独特连接。',
          '你在不同阶段可能有不同的情感重点，逐步理解自我。',
          '你成为多元社群的积极参与者。',
        ],
        risk: '身份流动期可能带来自我认同的困惑。',
        opportunity: '你能体验到人与人之间更纯粹的情感。',
        suggestion: '建议保持自我觉察，勇于表达真实感受。',
      };
    case '无性恋 Asexual':
      return {
        story: [
          '你发现自己的性吸引力会有波动，偶尔会对某些人产生特殊情感。',
          '你逐步理解无性恋的多样性，接纳自我变化。',
          '你在社群中分享经验，帮助他人理解流动性。',
        ],
        risk: '流动性可能带来自我认同的焦虑。',
        opportunity: '你能成为无性恋群体的榜样。',
        suggestion: '建议多与同伴交流，记录自我成长历程。',
      };
    default:
      return {
        story: [
          '你体验到性取向的多样性和流动性，逐步理解自我。',
          '你在探索中发现更多可能性，结识不同背景的朋友。',
          '你学会欣赏每一种独特的情感体验。',
        ],
        risk: '流动性可能带来短暂的迷茫和不安。',
        opportunity: '你能获得更丰富的人生体验和自我成长。',
        suggestion: '建议保持开放心态，勇于探索和表达自我。',
      };
  }
}

// 资源神经网络图组件
const resourceMap: Record<string, { concept: string, paper: string, org: string }> = {
  '异性恋 Heterosexual': {
    concept: '异性恋规范理论',
    paper: '《异性恋规范与社会结构》',
    org: '中国心理学会性别心理专委会',
  },
  '同性恋 Homosexual': {
    concept: '性少数压力模型',
    paper: '《同性恋心理健康与社会支持》',
    org: '同志亦凡人公益',
  },
  '双性恋 Bisexual': {
    concept: '莫妮克·威特ig理论',
    paper: '《双性恋心理健康白皮书》',
    org: '北京同志中心',
  },
  '泛性恋 Pansexual': {
    concept: '性别流动性理论',
    paper: '《性别多元与社会包容》',
    org: '彩虹之家',
  },
  '灰性恋 Graysexual': {
    concept: '性吸引力光谱',
    paper: '《灰性恋群体心理研究》',
    org: '无性恋中国',
  },
  '无性恋 Asexual': {
    concept: '性取向多元理论',
    paper: '《无性恋心理健康指南》',
    org: '无性恋中国',
  },
  '跨性别恋 Skoliosexual': {
    concept: '性别酷儿理论',
    paper: '《跨性别心理与社会支持》',
    org: '跨儿之家',
  },
  '恋物性取向 Objectum Sexuality': {
    concept: '恋物心理学',
    paper: '《恋物性取向的心理机制》',
    org: '中国心理学会性别心理专委会',
  },
  '智性恋 Sapiosexual': {
    concept: '智力吸引理论',
    paper: '《智性恋与亲密关系研究》',
    org: '彩虹之家',
  },
};

const ResourceGraph = ({ orientationType }: { orientationType: any }) => {
  const node = resourceMap[orientationType.label] || resourceMap['异性恋 Heterosexual'];
  return (
    <div className="w-full flex flex-col items-center">
      {/* 移动端友好分组卡片，md及以上横向链路 */}
      <div className="hidden md:flex flex-row items-center gap-4 mb-4">
        <GraphNode label={orientationType.label} type="result" />
        <GraphArrow />
        <GraphNode label={node.concept} type="concept" />
        <GraphArrow />
        <GraphNode label={node.paper} type="paper" />
        <GraphArrow />
        <GraphNode label={node.org} type="org" />
      </div>
      <div className="hidden md:flex gap-4 text-xs text-gray-500 items-center">
        <span>测试结果</span>
        <span className="ml-8">心理学概念</span>
        <span className="ml-12">学术论文</span>
        <span className="ml-16">线下支持机构</span>
      </div>
      {/* 移动端竖向友好卡片链路 */}
      <div className="flex flex-col md:hidden w-full max-w-xs mx-auto">
        <MobileGraphCard title="测试结果" color="purple" label={orientationType.label} />
        <MobileGraphLine />
        <MobileGraphCard title="心理学概念" color="blue" label={node.concept} />
        <MobileGraphLine />
        <MobileGraphCard title="学术论文" color="green" label={node.paper} />
        <MobileGraphLine />
        <MobileGraphCard title="线下支持机构" color="yellow" label={node.org} />
      </div>
    </div>
  );
};

const GraphNode = ({ label, type }: { label: string, type: string }) => {
  const colorMap: Record<string, string> = {
    result: 'bg-purple-100 border-purple-400',
    concept: 'bg-blue-100 border-blue-400',
    paper: 'bg-green-100 border-green-400',
    org: 'bg-yellow-100 border-yellow-400',
  };
  return (
    <div className={`px-4 py-2 rounded-full border-2 font-semibold shadow-sm text-center min-w-[80px] max-w-[160px] break-words ${colorMap[type]}`}>{label}</div>
  );
};

const GraphArrow = () => (
  <span className="text-2xl text-gray-400">
    <span className="hidden md:inline">→</span>
    <span className="inline md:hidden">↓</span>
  </span>
);

const MobileGraphCard = ({ title, color, label }: { title: string, color: string, label: string }) => {
  const colorMap: Record<string, string> = {
    purple: 'bg-purple-50 border-purple-300',
    blue: 'bg-blue-50 border-blue-300',
    green: 'bg-green-50 border-green-300',
    yellow: 'bg-yellow-50 border-yellow-300',
  };
  return (
    <div className={`flex flex-col items-center border-2 rounded-xl shadow-sm mb-2 py-3 px-2 ${colorMap[color]}`}
      style={{ minHeight: 64 }}>
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="font-semibold text-base text-center break-words">{label}</div>
    </div>
  );
};

const MobileGraphLine = () => (
  <div className="flex justify-center mb-2">
    <div className="w-1 h-6 bg-gray-200 rounded-full" />
  </div>
);

const StoryHighlight = ({ orientationType }: { orientationType: OrientationType }) => {
  let story = '';
  switch (orientationType.label) {
    case '同性恋 Homosexual':
      story = `\n【艾伦·图灵的故事】\n艾伦·图灵（Alan Turing），英国著名数学家、计算机科学奠基人，二战期间破解纳粹密码，为世界和平做出巨大贡献。图灵因同性恋身份在当时英国社会遭受不公正对待，最终英年早逝。2013年，英国政府为其平反并公开道歉。图灵的经历激励无数LGBTQ+群体勇敢追求自我价值，他的天赋与贡献证明：性取向无法定义一个人的全部，世界因多元而精彩。`;
      break;
    case '双性恋 Bisexual':
      story = `\n【弗雷迪·默丘里的故事】\n弗雷迪·默丘里（Freddie Mercury），皇后乐队主唱，音乐史上最具影响力的艺术家之一。他公开承认自己是双性恋，并用音乐打破性别与取向的界限。弗雷迪的舞台魅力和真实自我，激励了无数人勇敢表达自我，享受多元人生。`;
      break;
    case '泛性恋 Pansexual':
      story = `\n【麦莉·赛勒斯的故事】\n美国流行歌手麦莉·赛勒斯（Miley Cyrus）公开表示自己是泛性恋。她在采访中坦言：\"我爱的是人，而不是性别。\"麦莉积极参与LGBTQ+公益，倡导包容与平等，鼓励年轻人勇敢做自己。`;
      break;
    case '无性恋 Asexual':
      story = `\n【大卫·杰伊的故事】\n大卫·杰伊（David Jay）是国际无性恋可见性与教育网络（AVEN）创始人。他用自身经历推动无性恋群体的社会认知，倡导每个人都能以自己的方式体验亲密与幸福。`;
      break;
    case '灰性恋 Graysexual':
      story = `\n【灰性恋者的真实心声】\n"我并不总是对别人有感觉，但当我遇到特别的人时，那种情感很珍贵。"——来自中国灰性恋社群的匿名分享。灰性恋者的故事提醒我们，每种情感体验都值得被尊重。`;
      break;
    case '跨性别恋 Skoliosexual':
      story = `\n【拉弗恩·考克斯的故事】\n拉弗恩·考克斯（Laverne Cox），美国著名跨性别演员、LGBTQ+活动家。她用自己的经历为跨性别群体发声，推动社会包容与平等。她的故事让更多人看到性别多元的美好。`;
      break;
    case '恋物性取向 Objectum Sexuality':
      story = `\n【艾丽卡·拉贝尔的故事】\n艾丽卡·拉贝尔（Erika Eiffel）因与埃菲尔铁塔"结婚"而闻名。她公开分享自己的恋物性取向，呼吁社会理解和尊重每个人独特的情感世界。`;
      break;
    case '智性恋 Sapiosexual':
      story = `\n【智性恋者的自述】\n"我被思想的火花吸引，和有趣的灵魂交流让我感到幸福。"——来自知乎智性恋群体的分享。智性恋者用自己的方式诠释了精神世界的浪漫。`;
      break;
    default:
      story = `每个人的故事都值得被尊重。你并不孤单，世界上有许多与你有相似经历的人。`;
  }
  return (
    <div className="bg-purple-50 border-l-4 border-purple-300 p-4 rounded text-gray-700 whitespace-pre-line">
      {story}
    </div>
  );
};

export default Results; 
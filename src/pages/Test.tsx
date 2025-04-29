import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Question {
  id: number;
  group: string;
  text: string;
  note: string;
}

const questions: Question[] = [
  // 第一部分：情感吸引光谱
  { id: 1, group: '情感吸引光谱', text: '异性的香水气息会让我心跳漏拍', note: '映射金赛量表对异性吸引力的测量逻辑' },
  { id: 2, group: '情感吸引光谱', text: '同性的笑容比异性更让我感到温暖', note: '参考性向度理论对同性吸引的界定' },
  { id: 3, group: '情感吸引光谱', text: '专注整理书籍的陌生人，性别不影响我对TA心动', note: '呼应泛性恋的去性别化吸引特征' },
  { id: 4, group: '情感吸引光谱', text: '听到中性嗓音读诗时会产生浪漫幻想', note: '结合跨性别声线吸引力研究' },
  { id: 5, group: '情感吸引光谱', text: '从未对任何人产生过肢体亲密欲望', note: '对应无性恋的核心判定标准' },
  { id: 6, group: '情感吸引光谱', text: '古旧书籍的磨砂触感比人体肌肤更让我着迷', note: '隐喻式表达恋物取向的心理机制' },
  { id: 7, group: '情感吸引光谱', text: '看到跨性别者独特的穿搭风格会忍不住多看两眼', note: '测试对性别表达的开放态度' },
  { id: 8, group: '情感吸引光谱', text: '深夜电台主持人性别模糊的声线常引发我的遐想', note: '映射非二元性别的声音吸引力' },
  { id: 9, group: '情感吸引光谱', text: '对生理特征不符合传统分类的人产生过好奇或好感', note: '指向间性人群体接纳度评估' },
  { id: 10, group: '情感吸引光谱', text: '特定性别的脆弱时刻（如强忍泪水）特别触动我', note: '涉及情感投射的性别偏好分析' },
  
  // 第二部分：关系构建模式
  { id: 11, group: '关系构建模式', text: '期待与跨性别伴侣在实验室研究分子料理', note: '映射跨性别亲密关系的场景化测试' },
  { id: 12, group: '关系构建模式', text: '能接受伴侣的生理性别与心理认同不一致', note: '测试跨性别关系包容性' },
  { id: 13, group: '关系构建模式', text: '智力对话带来的满足感远超肢体接触', note: '体现智性恋的核心特征' },
  { id: 14, group: '关系构建模式', text: '更愿意在极光下交换手作戒指而非传统钻戒', note: '反映对制度性关系的态度' },
  { id: 15, group: '关系构建模式', text: '排斥所有需要明确性别角色的亲密关系', note: '评估非二元性别关系倾向' },
  { id: 16, group: '关系构建模式', text: '双人旅行时更在意目的地而非同伴性别', note: '测试泛性恋的情感优先特征' },
  { id: 17, group: '关系构建模式', text: '期待收到性别未知者的手写情书', note: '映射去性别化的浪漫需求' },
  { id: 18, group: '关系构建模式', text: '能理解开放式关系的存在合理性', note: '涉及多边恋伦理的认知测试' },
  { id: 19, group: '关系构建模式', text: '与任何人约会都需要明确对方的性别定位', note: '反映性别确定性需求' },
  { id: 20, group: '关系构建模式', text: '认为爱情的本质是灵魂共振而非生理匹配', note: '呼应酷儿理论的核心主张' },
  
  // 第三部分：社会身份认知
  { id: 21, group: '社会身份认知', text: '主动使用「他们」代词称呼非二元性别者', note: '测试语言包容性实践' },
  { id: 22, group: '社会身份认知', text: '认为性别重置手术是自我认同的重要途径', note: '评估跨性别医疗认知' },
  { id: 23, group: '社会身份认知', text: '穿着中性服装时会产生强烈性别愉悦感', note: '引用跨性别euphoria概念' },
  { id: 24, group: '社会身份认知', text: '期待未来社会取消所有性别分类标识', note: '测试性别解构的前沿态度' },
  { id: 25, group: '社会身份认知', text: '认为「爱情应超越生理性别」是基本人权', note: '衡量社会平等价值观' },
  { id: 26, group: '社会身份认知', text: '曾因性取向问题产生长期自我怀疑', note: '映射性少数群体认知困境' },
  { id: 27, group: '社会身份认知', text: '认为无性恋是心理疾病的说法不可接受', note: '反对性取向病理化观点' },
  { id: 28, group: '社会身份认知', text: '愿意参与彩虹主题公益活动', note: '测试社群归属感' },
  { id: 29, group: '社会身份认知', text: '认为性取向会随时间推移自然流动变化', note: '呼应金赛流动性取向理论' },
  { id: 30, group: '社会身份认知', text: '期待建立更精细的性取向分类体系', note: '指向学术研究前沿期待' },
];

const gradientOptions = [
  { value: 4, label: '非常同意', size: 'w-12 h-12' },
  { value: 3, label: '比较同意', size: 'w-10 h-10' },
  { value: 2, label: '不确定', size: 'w-8 h-8' },
  { value: 1, label: '比较不同意', size: 'w-10 h-10' },
  { value: 0, label: '非常不同意', size: 'w-12 h-12' },
];

const Test: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(30).fill(-1));
  const navigate = useNavigate();
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);

    const currentQuestionNumber = questionIndex % 10;
    if (currentQuestionNumber < 9) {
      const nextQuestion = questionRefs.current[currentQuestionNumber + 1];
      if (nextQuestion) {
        setTimeout(() => {
          nextQuestion.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    } else {
      // 计算每个维度的得分
      const dimensionScores = {
        attraction: answers.slice(0, 10).reduce((sum, val) => sum + val, 0) / 40, // 情感吸引光谱
        relationship: answers.slice(10, 20).reduce((sum, val) => sum + val, 0) / 40, // 关系构建模式
        identity: answers.slice(20, 30).reduce((sum, val) => sum + val, 0) / 40, // 社会身份认知
      };
      
      navigate('/results', { 
        state: { 
          scores: dimensionScores,
          answers: answers,
        } 
      });
    }
  };

  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const sections = ['情感吸引光谱', '关系构建模式', '社会身份认知'];

  const isPageComplete = () => {
    return answers.slice(startIndex, endIndex).every(answer => answer !== -1);
  };

  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(0, currentQuestions.length);
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-8">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                ${index < currentPage ? 'bg-purple-600 text-white' : 
                  index === currentPage ? 'bg-purple-200 text-purple-600' : 
                  'bg-gray-200 text-gray-400'}`}>
                {index + 1}
              </div>
              <span className={`text-sm ${index < currentPage ? 'text-purple-600 font-medium' : 
                index === currentPage ? 'text-purple-600' : 'text-gray-400'}`}>
                {section}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          {currentQuestions.map((question, index) => {
            const questionIndex = startIndex + index;
            return (
              <div 
                key={questionIndex} 
                ref={el => questionRefs.current[index] = el}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-medium mb-2 text-gray-800">
                  {question.text}
                </h2>
                <p className="text-sm text-gray-500 mb-6 italic">
                  {question.note}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">同意</span>
                  <div className="flex-1 mx-4 flex justify-between items-center">
                    {gradientOptions.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswer(questionIndex, option.value)}
                        className={`${option.size} rounded-full flex items-center justify-center transition-all
                          ${answers[questionIndex] === option.value
                            ? optionIndex <= 2 
                              ? 'bg-green-600 text-white transform scale-110'
                              : 'bg-purple-500 text-white transform scale-110'
                            : optionIndex <= 2
                              ? 'border-2 border-green-600 hover:border-green-400'
                              : 'border-2 border-purple-200 hover:border-purple-400'
                          }`}
                        title={option.label}
                      >
                        {answers[questionIndex] === option.value && (
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="text-purple-600 font-medium">不认同</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNextPage}
            disabled={!isPageComplete()}
            className={`px-8 py-3 rounded-lg text-white font-medium transition-colors
              ${isPageComplete() 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-gray-300 cursor-not-allowed'}`}
          >
            {currentPage === 2 ? '查看结果' : '下一部分'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test; 
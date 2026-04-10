import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../contexts/LanguageContext';

interface Question {
  id: number;
  group: string;
  type: string;
  text: string;
  note: string;
}

const gradientOptions = [
  { value: 4, label: '非常同意', size: 'w-10 h-10' },
  { value: 3, label: '比较同意', size: 'w-8 h-8' },
  { value: 2, label: '不确定', size: 'w-6 h-6' },
  { value: 1, label: '比较不同意', size: 'w-8 h-8' },
  { value: 0, label: '非常不同意', size: 'w-10 h-10' },
];

const Test: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(30).fill(-1));
  const navigate = useNavigate();
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useI18n();
  const questions: Question[] = t.test.questions;

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
        attraction: answers.slice(0, 10).reduce((sum, val) => sum + val, 0) / 40,
        relationship: answers.slice(10, 20).reduce((sum, val) => sum + val, 0) / 40,
        identity: answers.slice(20, 30).reduce((sum, val) => sum + val, 0) / 40,
      };

      // 分区加权：吸引力光谱最能反映核心取向（×3），关系模式次之（×2），
      // 社会身份认知更多测量价值观而非取向倾向（×1）
      const sectionWeights: Record<string, number> = {
        'Attraction Spectrum': 3,
        'Relationship Patterns': 2,
        'Social Identity Cognition': 1,
      };

      const typeMap = t.test.typeMap;
      const typeAccum: Record<string, { weightedSum: number; maxSum: number }> = {};

      questions.forEach((q, idx) => {
        if (!typeAccum[q.type]) typeAccum[q.type] = { weightedSum: 0, maxSum: 0 };
        const w = sectionWeights[q.group] ?? 1;
        if (answers[idx] !== -1) {
          typeAccum[q.type].weightedSum += answers[idx] * w;
          typeAccum[q.type].maxSum += 4 * w;
        }
      });

      // 各类型加权原始分（0-100），答"不确定"时中性基线 ≈ 50
      const rawScores = typeMap.map(type => {
        const acc = typeAccum[type] || { weightedSum: 0, maxSum: 1 };
        return {
          name: type,
          raw: acc.maxSum > 0 ? (acc.weightedSum / acc.maxSum) * 100 : 50,
        };
      });

      // 主类型 = 加权原始分最高者（最真实反映核心取向）
      const primaryType = rawScores.reduce(
        (best, cur) => cur.raw > best.raw ? cur : best,
        rawScores[0]
      );

      // 雷达图对比增强：以均值为轴心拉伸（×2.2），使主类型与其余类型区分度更高
      // 避免所有类型堆在 45-65% 导致雷达图呈圆形
      const mean = rawScores.reduce((s, d) => s + d.raw, 0) / rawScores.length;
      const STRETCH = 2.2;
      const radarData = rawScores.map(item => ({
        name: item.name,
        value: Math.min(98, Math.max(8, Math.round(mean + (item.raw - mean) * STRETCH))),
      }));

      window.scrollTo({ top: 0, behavior: 'auto' });
      navigate('/results', {
        state: {
          scores: dimensionScores,
          answers,
          radarData,
          primaryType: primaryType.name,
        }
      });
    }
  };

  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const sections = t.test.progress;

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
            const answered = answers[questionIndex] !== -1;
            return (
              <div 
                key={questionIndex} 
                ref={el => questionRefs.current[index] = el}
                className={`p-6 rounded-lg shadow-md transition-colors duration-200 ${answered ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}
              >
                <h2 className="text-lg font-medium mb-2 text-gray-800">
                  {question.text}
                </h2>
                <p className="text-sm text-gray-500 mb-6 italic">
                  {question.note}
                </p>
                
                <div className="flex flex-col items-center w-full">
                  <div className="flex w-full justify-center items-center gap-8">
                    {t.test.options.map((label, optionIndex) => {
                      const option = gradientOptions[optionIndex];
                      const isSelected = answers[questionIndex] === option.value;
                      const faded = answered && !isSelected;
                      return (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswer(questionIndex, option.value)}
                          className={
                            `${option.size} rounded-full flex items-center justify-center transition-all
                            ${isSelected
                              ? optionIndex <= 2 
                                ? 'bg-green-600 text-white transform scale-110'
                                : 'bg-purple-500 text-white transform scale-110'
                              : optionIndex <= 2
                                ? faded ? 'border-2 border-green-200 text-green-200' : 'border-2 border-green-500 text-green-500 hover:border-green-600'
                                : faded ? 'border-2 border-purple-200 text-purple-200' : 'border-2 border-purple-500 text-purple-500 hover:border-purple-600'
                            }
                          `
                          }
                          title={label}
                          style={{ minWidth: 0, minHeight: 0 }}
                        >
                          {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex w-full justify-between mt-2 px-2">
                    <span className={`font-medium transition-colors ${answered ? 'text-green-300' : 'text-green-600'}`}>{t.test.agree}</span>
                    <span className={`font-medium transition-colors ${answered ? 'text-purple-300' : 'text-purple-600'}`}>{t.test.disagree}</span>
                  </div>
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
            {currentPage === 2 ? t.test.submit : t.test.next}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test; 
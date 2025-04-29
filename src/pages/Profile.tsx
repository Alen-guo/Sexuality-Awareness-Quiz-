import React, { useState } from 'react';

interface TestHistory {
  id: number;
  date: string;
  result: string;
}

const Profile: React.FC = () => {
  const [testHistory, setTestHistory] = useState<TestHistory[]>([
    {
      id: 1,
      date: "2024-03-15",
      result: "传统性别认同",
    },
    // 可以添加更多历史记录
  ]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-purple-600 mb-8">
            个人中心
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">测试历史</h2>
            <div className="space-y-4">
              {testHistory.map((test) => (
                <div
                  key={test.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{test.result}</h3>
                      <p className="text-gray-600">{test.date}</p>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700">
                      查看详情
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">账户设置</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>邮箱通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>隐私设置</span>
                <button className="text-purple-600 hover:text-purple-700">
                  修改
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-600">
              我们致力于提供专业的性别认同测试服务，帮助人们更好地了解自己。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">联系方式</h3>
            <p className="text-gray-600">
              邮箱：446675781@qq.com
              <br />
              {/* 电话：400-123-4567 */}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                微信
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                微博
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© 2025 性别测试. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
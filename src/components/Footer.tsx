import React from 'react';
import { useI18n } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const t = useI18n();
  
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.about.title}</h3>
            <p className="text-gray-600">
              {t.footer.about.desc}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.contact.title}</h3>
            <p className="text-gray-600">
              {t.footer.contact.email}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.social.title}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                {t.footer.social.wechat}
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                {t.footer.social.weibo}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
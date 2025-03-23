
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'jp';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const defaultLanguage: Language = 'en';

// Simple translations dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.quests': 'Quests',
    'nav.stories': 'Stories',
    'nav.routes': 'Routes',
    'nav.explore': 'Explore',
    'nav.passport': 'Passport',
    'nav.admin': 'Admin',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.signin': 'Sign In',
    'nav.myQuests': 'My Quests',
    
    // Admin Panel
    'admin.dashboard': 'Dashboard',
    'admin.stories': 'Stories Management',
    'admin.routes': 'Routes Management',
    'admin.quests': 'Quests Management',
    'admin.users': 'Users Management',
    'admin.settings': 'Settings',
    'admin.backToSite': 'Back to Site',

    // General
    'app.languageEN': 'English',
    'app.languageJP': 'Japanese',
  },
  jp: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.quests': 'クエスト',
    'nav.stories': 'ストーリー',
    'nav.routes': 'ルート',
    'nav.explore': '探索',
    'nav.passport': 'パスポート',
    'nav.admin': '管理画面',
    'nav.profile': 'プロフィール',
    'nav.logout': 'ログアウト',
    'nav.signin': 'サインイン',
    'nav.myQuests': 'マイクエスト',
    
    // Admin Panel
    'admin.dashboard': 'ダッシュボード',
    'admin.stories': 'ストーリー管理',
    'admin.routes': 'ルート管理',
    'admin.quests': 'クエスト管理',
    'admin.users': 'ユーザー管理',
    'admin.settings': '設定',
    'admin.backToSite': 'サイトに戻る',

    // General
    'app.languageEN': '英語',
    'app.languageJP': '日本語',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get language from localStorage, fallback to browser language or default
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('ja') ? 'jp' : 'en';
  };

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return defaultLanguage;
    
    const storedLanguage = localStorage.getItem('language') as Language;
    return storedLanguage || getBrowserLanguage();
  });

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

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
    'admin.createQuest': 'Create Quest',
    'admin.createStory': 'Create Story',
    'admin.createRoute': 'Create Route',
    'admin.social': 'Social Media',
    'admin.analytics': 'Analytics',
    'admin.contentLocalization': 'Content Localization',
    'admin.totalUsers': 'Total Users',
    'admin.activeUsers': 'Active Users',
    'admin.completedQuests': 'Completed Quests',
    'admin.pendingApproval': 'Pending Approval',
    'admin.title': 'Title',
    'admin.description': 'Description',
    'admin.actions': 'Actions',
    'admin.status': 'Status',
    'admin.published': 'Published',
    'admin.draft': 'Draft',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.save': 'Save',
    'admin.cancel': 'Cancel',
    'admin.confirm': 'Confirm',
    'admin.addNew': 'Add New',
    'admin.search': 'Search',
    'admin.filter': 'Filter',
    'admin.sort': 'Sort',
    'admin.pagination': 'Showing {start} to {end} of {total} entries',
    'admin.noData': 'No data available',
    'admin.loading': 'Loading...',
    'admin.error': 'An error occurred',
    'admin.success': 'Operation successful',
    'admin.info': 'Basic Information',
    'admin.media': 'Media & Assets',
    'admin.confirmDelete': 'Confirm Delete',
    'admin.deleteStoryConfirm': 'Are you sure you want to delete this story? This action cannot be undone.',
    'admin.thumbnail': 'Thumbnail Image',
    'admin.preview': 'Preview',
    'admin.addChapter': 'Add Chapter',
    'admin.totalChapters': 'Total Chapters',
    'admin.unlockedChapters': 'Unlocked Chapters',
    'admin.chaptersNote': 'Create the story first to add detailed chapter content with text and videos.',
    'admin.relatedRouteHelp': 'Connect this story to a model route or tourist spot for map integration.',
    'admin.tags': 'Tags',
    'admin.tagsHelp': 'Tags help users discover related content (e.g., Kyoto, Temples, Food)',
    
    // Story System
    'story.chapters': 'Chapters',
    'story.characters': 'Characters',
    'story.lore': 'World Lore',
    'story.readMore': 'Read More',
    'story.watchVideo': 'Watch Video',
    'story.relatedQuests': 'Related Quests',
    'story.relatedSpots': 'Related Tourist Spots',
    'story.chapter': 'Chapter',
    'story.unlockChapter': 'Unlock Chapter',
    'story.lockedContent': 'Locked',
    
    // Quests
    'quest.start': 'Start Quest',
    'quest.continue': 'Continue Quest',
    'quest.complete': 'Complete Quest',
    'quest.reward': 'Reward',
    'quest.difficulty': 'Difficulty',
    'quest.timeRequired': 'Time Required',
    'quest.location': 'Location',
    'quest.online': 'Online Quest',
    'quest.onsite': 'On-site Quest',
    'quest.tasks': 'Tasks',
    'quest.progress': 'Progress',
    'quest.completed': 'Completed',
    'quest.inProgress': 'In Progress',
    'quest.notStarted': 'Not Started',
    'quest.taskCompleted': 'Task Completed',
    
    // Passport
    'passport.title': 'Digital Passport',
    'passport.stamps': 'Hanko Stamps',
    'passport.points': 'Tourii Points',
    'passport.level': 'Level',
    'passport.achievements': 'Achievements',
    'passport.badges': 'Badges',
    'passport.unlocked': 'Unlocked',
    'passport.addToWallet': 'Add to Digital Wallet',
    'passport.share': 'Share Passport',
    'passport.downloadPDF': 'Download PDF Version',
    
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.forgotPassword': 'Forgot Password',
    'auth.resetPassword': 'Reset Password',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.username': 'Username',
    'auth.rememberMe': 'Remember Me',
    'auth.loginWith': 'Login with {provider}',
    'auth.registerWith': 'Register with {provider}',
    'auth.orContinueWith': 'Or continue with',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': 'Don\'t have an account?',
    'auth.agreeToTerms': 'By continuing, you agree to our Terms of Service and Privacy Policy',
    
    // Terms and Privacy
    'terms.title': 'Legal Information',
    'terms.subtitle': 'Please read our Terms of Service and Privacy Policy carefully',
    'terms.termsTab': 'Terms of Service',
    'terms.privacyTab': 'Privacy Policy',
    'terms.lastUpdated': 'Last Updated:',
    'terms.contactUs': 'Contact Us',
    
    // General
    'app.languageEN': 'English',
    'app.languageJP': 'Japanese',
    'app.loading': 'Loading...',
    'app.error': 'Error',
    'app.success': 'Success',
    'app.warning': 'Warning',
    'app.info': 'Information',
    'app.close': 'Close',
    'app.save': 'Save',
    'app.cancel': 'Cancel',
    'app.delete': 'Delete',
    'app.edit': 'Edit',
    'app.create': 'Create',
    'app.search': 'Search',
    'app.filter': 'Filter',
    'app.sort': 'Sort',
    'app.ascending': 'Ascending',
    'app.descending': 'Descending',
    'app.next': 'Next',
    'app.previous': 'Previous',
    'app.submit': 'Submit',
    'app.reset': 'Reset',
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
    'admin.createQuest': 'クエスト作成',
    'admin.createStory': 'ストーリー作成',
    'admin.createRoute': 'ルート作成',
    'admin.social': 'ソーシャルメディア',
    'admin.analytics': '分析',
    'admin.contentLocalization': 'コンテンツのローカライズ',
    'admin.totalUsers': '総ユーザー数',
    'admin.activeUsers': 'アクティブユーザー',
    'admin.completedQuests': '完了したクエスト',
    'admin.pendingApproval': '承認待ち',
    'admin.title': 'タイトル',
    'admin.description': '説明',
    'admin.actions': 'アクション',
    'admin.status': 'ステータス',
    'admin.published': '公開済み',
    'admin.draft': '下書き',
    'admin.edit': '編集',
    'admin.delete': '削除',
    'admin.save': '保存',
    'admin.cancel': 'キャンセル',
    'admin.confirm': '確認',
    'admin.addNew': '新規追加',
    'admin.search': '検索',
    'admin.filter': 'フィルター',
    'admin.sort': '並べ替え',
    'admin.pagination': '{total}件中{start}〜{end}件を表示',
    'admin.noData': 'データがありません',
    'admin.loading': '読み込み中...',
    'admin.error': 'エラーが発生しました',
    'admin.success': '操作が成功しました',
    'admin.info': '基本情報',
    'admin.media': 'メディアとアセット',
    'admin.confirmDelete': '削除の確認',
    'admin.deleteStoryConfirm': 'このストーリーを削除してもよろしいですか？この操作は元に戻せません。',
    'admin.thumbnail': 'サムネイル画像',
    'admin.preview': 'プレビュー',
    'admin.addChapter': 'チャプター追加',
    'admin.totalChapters': '総チャプター数',
    'admin.unlockedChapters': '解除済みチャプター',
    'admin.chaptersNote': 'ストーリーを作成した後、テキストや動画を含む詳細なチャプターコンテンツを追加できます。',
    'admin.relatedRouteHelp': 'このストーリーをモデルルートや観光スポットに接続して、マップ統合を行います。',
    'admin.tags': 'タグ',
    'admin.tagsHelp': 'タグは関連コンテンツを発見するのに役立ちます（例：京都、寺院、料理）',
    
    // Story System
    'story.chapters': '章',
    'story.characters': 'キャラクター',
    'story.lore': '世界観',
    'story.readMore': '続きを読む',
    'story.watchVideo': '動画を見る',
    'story.relatedQuests': '関連クエスト',
    'story.relatedSpots': '関連観光スポット',
    'story.chapter': '章',
    'story.unlockChapter': '章を解除する',
    'story.lockedContent': 'ロック中',
    
    // Quests
    'quest.start': 'クエスト開始',
    'quest.continue': 'クエスト続行',
    'quest.complete': 'クエスト完了',
    'quest.reward': '報酬',
    'quest.difficulty': '難易度',
    'quest.timeRequired': '所要時間',
    'quest.location': '場所',
    'quest.online': 'オンラインクエスト',
    'quest.onsite': '現地クエスト',
    'quest.tasks': 'タスク',
    'quest.progress': '進捗',
    'quest.completed': '完了',
    'quest.inProgress': '進行中',
    'quest.notStarted': '未開始',
    'quest.taskCompleted': 'タスク完了',
    
    // Passport
    'passport.title': 'デジタルパスポート',
    'passport.stamps': '判子スタンプ',
    'passport.points': 'トゥーリーポイント',
    'passport.level': 'レベル',
    'passport.achievements': '実績',
    'passport.badges': 'バッジ',
    'passport.unlocked': '解除済み',
    'passport.addToWallet': 'デジタルウォレットに追加',
    'passport.share': 'パスポートを共有',
    'passport.downloadPDF': 'PDF版をダウンロード',
    
    // Authentication
    'auth.login': 'ログイン',
    'auth.register': '登録',
    'auth.forgotPassword': 'パスワードをお忘れですか',
    'auth.resetPassword': 'パスワードをリセット',
    'auth.email': 'メールアドレス',
    'auth.password': 'パスワード',
    'auth.confirmPassword': 'パスワード確認',
    'auth.username': 'ユーザー名',
    'auth.rememberMe': 'ログイン状態を保持',
    'auth.loginWith': '{provider}でログイン',
    'auth.registerWith': '{provider}で登録',
    'auth.orContinueWith': 'または次で続行',
    'auth.alreadyHaveAccount': 'すでにアカウントをお持ちですか？',
    'auth.dontHaveAccount': 'アカウントをお持ちでないですか？',
    'auth.agreeToTerms': '続行すると、利用規約とプライバシーポリシーに同意したことになります',
    
    // Terms and Privacy
    'terms.title': '法的情報',
    'terms.subtitle': '利用規約とプライバシーポリシーを注意深くお読みください',
    'terms.termsTab': '利用規約',
    'terms.privacyTab': 'プライバシーポリシー',
    'terms.lastUpdated': '最終更新日:',
    'terms.contactUs': 'お問い合わせ',
    
    // General
    'app.languageEN': '英語',
    'app.languageJP': '日本語',
    'app.loading': '読み込み中...',
    'app.error': 'エラー',
    'app.success': '成功',
    'app.warning': '警告',
    'app.info': '情報',
    'app.close': '閉じる',
    'app.save': '保存',
    'app.cancel': 'キャンセル',
    'app.delete': '削除',
    'app.edit': '編集',
    'app.create': '作成',
    'app.search': '検索',
    'app.filter': 'フィルター',
    'app.sort': '並べ替え',
    'app.ascending': '昇順',
    'app.descending': '降順',
    'app.next': '次へ',
    'app.previous': '前へ',
    'app.submit': '送信',
    'app.reset': 'リセット',
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

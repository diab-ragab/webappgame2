import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ru' | 'zh'

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    playNow: 'Play Now',
    register: 'Register',
    login: 'Login',
    features: 'Features',
    classes: 'Classes',
    rankings: 'Rankings',
    download: 'Download',
    news: 'News',
    serverStatus: 'Server Status',
    online: 'Online',
    players: 'Players',
    uptime: 'Uptime',
    playersOnline: 'Players Online',
  },
  es: {
    playNow: 'Jugar Ahora',
    register: 'Registrarse',
    login: 'Iniciar Sesión',
    features: 'Características',
    classes: 'Clases',
    rankings: 'Clasificaciones',
    download: 'Descargar',
    news: 'Noticias',
    serverStatus: 'Estado del Servidor',
    online: 'En Línea',
    players: 'Jugadores',
    uptime: 'Tiempo Activo',
    playersOnline: 'Jugadores en Línea',
  },
  pt: {
    playNow: 'Jogar Agora',
    register: 'Registrar',
    login: 'Entrar',
    features: 'Recursos',
    classes: 'Classes',
    rankings: 'Rankings',
    download: 'Baixar',
    news: 'Notícias',
    serverStatus: 'Status do Servidor',
    online: 'Online',
    players: 'Jogadores',
    uptime: 'Tempo Ativo',
    playersOnline: 'Jogadores Online',
  },
  de: {
    playNow: 'Jetzt Spielen',
    register: 'Registrieren',
    login: 'Anmelden',
    features: 'Funktionen',
    classes: 'Klassen',
    rankings: 'Rangliste',
    download: 'Herunterladen',
    news: 'Neuigkeiten',
    serverStatus: 'Server Status',
    online: 'Online',
    players: 'Spieler',
    uptime: 'Betriebszeit',
    playersOnline: 'Spieler Online',
  },
  fr: {
    playNow: 'Jouer Maintenant',
    register: 'S\'inscrire',
    login: 'Connexion',
    features: 'Fonctionnalités',
    classes: 'Classes',
    rankings: 'Classements',
    download: 'Télécharger',
    news: 'Actualités',
    serverStatus: 'État du Serveur',
    online: 'En Ligne',
    players: 'Joueurs',
    uptime: 'Disponibilité',
    playersOnline: 'Joueurs en Ligne',
  },
  ru: {
    playNow: 'Играть Сейчас',
    register: 'Регистрация',
    login: 'Вход',
    features: 'Особенности',
    classes: 'Классы',
    rankings: 'Рейтинг',
    download: 'Скачать',
    news: 'Новости',
    serverStatus: 'Статус Сервера',
    online: 'Онлайн',
    players: 'Игроки',
    uptime: 'Время Работы',
    playersOnline: 'Игроков Онлайн',
  },
  zh: {
    playNow: '立即游玩',
    register: '注册',
    login: '登录',
    features: '特色',
    classes: '职业',
    rankings: '排行榜',
    download: '下载',
    news: '新闻',
    serverStatus: '服务器状态',
    online: '在线',
    players: '玩家',
    uptime: '运行时间',
    playersOnline: '在线玩家',
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  languages: Array<{ code: Language; name: string; flag: string }>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language
    return savedLang || 'en'
  })

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  ]

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

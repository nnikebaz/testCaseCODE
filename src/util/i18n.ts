import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      input: 'Enter name, tag, email...',
      sorting: 'Sorting',
      sort: {
        alphabet: 'By alphabet',
        birthday: 'By birthday',
      },
      tabs: {
        all: 'All',
        design: 'Design',
        bo: 'Back-office',
        analytics: 'Analytics',
        management: 'Management',
        techSupport: 'Tech support'
      },
      welcome: 'Welcome',
      changeLanguage: 'Change Language'
    }
  },
  ru: {
    translation: {
      input: 'Введите имя, тег, почту...',
      sorting: 'Сортировка',
      sort: {
        alphabet: 'По алфавиту',
        birthday: 'По дню рождения',
      },
      tabs: {
        all: 'Все',
        design: 'Дизайн',
        bo: 'Бэк-офис',
        analytics: 'Аналитика',
        management: 'Менеджмент',
        techSupport: 'Техподдержка'
      },
      welcome: 'Добро пожаловать',
      changeLanguage: 'Сменить язык'
    }
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18next
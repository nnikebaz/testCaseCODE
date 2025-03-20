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
        frontend: 'Frontend',
        backend: 'Backend',
        ios: 'iOS',
        android: 'Android',
        qa: 'QA',
        hr: 'HR',
        pr: 'PR',
        back_office: 'Back-office',
        analytics: 'Analytics',
        management: 'Management',
        support: 'Tech support'
      },
      years: {
        год: 'years',
        года: 'years',
        лет: 'years,'
      },
      networks: {
        offline: {
          first: "Can't update the data.",
          second: 'Check your internet connection.'
        },
        loading: 'Just a second, loading...'
      },
      nothingFound: {
        first: "We didn't find anyone",
        second: 'Try adjusting the query'
      },
      criticalError: {
        title: 'Some super-intelligence broke everything',
        description: "We'll try to get this fixed quickly",
        link: 'Try again',
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
        frontend: 'Frontend',
        backend: 'Backend',
        ios: 'iOS',
        android: 'Android',
        qa: 'QA',
        hr: 'HR',
        pr: 'PR',
        back_office: 'Бэк-офис',
        analytics: 'Аналитика',
        management: 'Менеджмент',
        support: 'Техподдержка'
      },
      years: {
        год: 'год',
        года: 'года',
        лет: 'лет,'
      },
      networks: {
        offline: {
          first: "Не могу обновить данные.",
          second: 'Проверь соединение с интернетом.'
        },
        loading: 'Секундочку, гружусь...'
      },
      nothingFound: {
        first: 'Мы никого не нашли',
        second: 'Попробуйте скорректировать запрос'
      },
      criticalError: {
        title: 'Какой-то сверхразум всё сломал',
        description: 'Постараемся быстро всё починить',
        link: 'Попробовать снова',
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
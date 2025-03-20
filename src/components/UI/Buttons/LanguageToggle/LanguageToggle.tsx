import { useTranslation } from 'react-i18next'
import './LanguageToggle.css'
import { useEffect } from 'react'

const LanguageToggle:React.FC = () => {
  const {i18n} = useTranslation()
  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  } 


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    console.log(localStorage)
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      const defaultLanguage = navigator.language.split('-')[0]
      console.log(defaultLanguage)
      const supportedLanguages = ['en', 'ru']
      if (supportedLanguages.includes(defaultLanguage)) {
        i18n.changeLanguage(defaultLanguage)
      } else {
        i18n.changeLanguage('en')
      }
    }
  }, [i18n]);

  return (
    <button className='LanguageToggle' onClick={changeLanguage}>
      <p className='LanguageToggle__item'>{i18n.language === 'ru' ? 'RU' : 'EN'}</p>
    </button>
  )
}

export default LanguageToggle
import { useTranslation } from 'react-i18next'
import './CriticalError.css'
import ufo from '/ufo-emoji.png'

const CriticalError:React.FC = () => {
  const {t} = useTranslation()
  
  return (
    <div className='CriticalError'>
      <div className='CriticalError__wrapper'>
        <img className='CriticalError__img' src={ufo} alt="Эмодзи летающей тарелки" />
        <h3 className='CriticalError__title'>{t('criticalError.title')}</h3>
        <p className='CriticalError__description'>{t('criticalError.description')}</p>
        <a className='CriticalError__link' href={window.location.href}>{t('criticalError.link')}</a>
      </div>
    </div>
  )
}

export default CriticalError
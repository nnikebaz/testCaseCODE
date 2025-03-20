import { useTranslation } from 'react-i18next'
import './NothingFound.css'

const NothingFound: React.FC = () => {
  const {t} = useTranslation()

  return <div className='NothingFound'>
    <img src="./left-pointing-magnifying-glass_1f50d.png" alt="Иконка лупы" />
    <p>{t('nothingFound.first')}</p>
    <p>{t('nothingFound.second')}</p>
  </div>
}

export default NothingFound
import { useEffect, useState } from 'react'
import './NetworkStatus.css'
import { useTranslation } from 'react-i18next'

const NetworkStatus:React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [offlineFlag, setOfflineFlag] = useState<boolean>(false)

  const {t} = useTranslation()

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setTimeout(() => {
        setOfflineFlag(false)
      }, 1000)
    } 
    const handleOffline = () => {
      setIsOnline(false)
      setOfflineFlag(true)
    } 

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    isOnline && offlineFlag ? (
      <div className='NetworkStatus__loading'>
        <p>{t('networks.loading')}</p>
      </div>
    ) : !isOnline ? (
      <div className='NetworkStatus__offline'>
        <p>{t('networks.offline.first')}<br className='mobile-break'></br>{t('networks.offline.second')}</p>
      </div>
    ) : <></>
  )
}

export default NetworkStatus
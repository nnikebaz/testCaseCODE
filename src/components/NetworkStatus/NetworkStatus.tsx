import { useEffect, useState } from 'react'
import './NetworkStatus.css'
import { Offline, Online } from 'react-detect-offline'
import { useUsersContext } from '../../contexts/usersContext'

const NetworkStatus:React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [offlineFlag, setOfflineFlag] = useState<boolean>(false)
  const {loading} = useUsersContext()

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
        <p>Секундочку, гружусь...</p>
      </div>
    ) : !isOnline ? (
      <div className='NetworkStatus__offline'>
        <p>Не могу обновить данные. <br className='mobile-break'></br>Проверь соединение с интернетом.</p>
      </div>
    ) : <></>
  )
}

export default NetworkStatus
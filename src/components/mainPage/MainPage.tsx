import { ReactElement } from 'react'
import './MainPage.css'
import TopAPPBar from './TopAPPBar/TopAPPBar'
import Profile from './Profile/Profile'

const MainPage: React.FC = () => {
  return (
    <div className='MainPage'>
      <TopAPPBar/>
      <Profile/>
    </div>
  )
}

export default MainPage
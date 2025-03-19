import { useState } from 'react'
import './BackButton.css'

interface BackButtonProps {
  onBackButtonClick: (isActive: boolean) => void;
}

const BackButton:React.FC<BackButtonProps> = ({onBackButtonClick}) => {
  const [activeBackButton, setActiveBackButton] = useState<boolean>(false)
  const handleOnBackButtonClick = ():void => {
    setActiveBackButton((prev) => !prev)
    onBackButtonClick(!activeBackButton)
  }

  return (
    <button className="back-button">
      <img src="./icon-back.svg" alt="Иконка назад" onClick={handleOnBackButtonClick}/>
    </button>
  )
}

export default BackButton
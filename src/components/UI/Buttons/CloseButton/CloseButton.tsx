import { useState } from 'react'
import './CloseButton.css'
import closeIcon from '/close-icon.svg'

interface CloseButtonProps {
  onCloseButtonClick: (isActive: boolean) => void;
}

const CloseButton:React.FC<CloseButtonProps> = ({onCloseButtonClick}) => {
  const [activeCloseButton, setActiveCloseButton] = useState<boolean>(false)
  const handleOnCloseButtonClick = ():void => {
    setActiveCloseButton((prev) => !prev)
    onCloseButtonClick(!activeCloseButton)
  }

  return (
    <button className="close-button">
      <img src={closeIcon} alt="Иконка закрыть" onClick={handleOnCloseButtonClick}/>
    </button>
  )
}

export default CloseButton
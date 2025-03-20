import LanguageToggle from '../UI/Buttons/LanguageToggle/LanguageToggle';
import ThemeToggle from '../UI/Buttons/ThemeToggle/ThemeToggle';
import './Sidebar.css'


const Sidebar:React.FC = () => {
  return (
    <div className='Sidebar'>
      <ThemeToggle/>
      <LanguageToggle/>
    </div>
  )
}

export default Sidebar
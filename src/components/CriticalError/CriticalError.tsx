import './CriticalError.css'
import ufo from '/ufo-emoji.png'

const CriticalError:React.FC = () => {
  return (
    <div className='CriticalError'>
      <div className='CriticalError__wrapper'>
        <img className='CriticalError__img' src={ufo} alt="Эмодзи летающей тарелки" />
        <h3 className='CriticalError__title'>Какой-то сверхразум всё сломал</h3>
        <p className='CriticalError__description'>Постараемся быстро всё починить</p>
        <a className='CriticalError__link' href={window.location.href}>Попробовать снова</a>
      </div>
    </div>
  )
}

export default CriticalError
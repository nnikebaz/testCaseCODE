import './NothingFound.css'

const NothingFound: React.FC = () => {
  return <div className='NothingFound'>
    <img src="./left-pointing-magnifying-glass_1f50d.png" alt="Иконка лупы" />
    <p>Мы никого не нашли</p>
    <p>Попробуй скорректировать запрос</p>
  </div>
}

export default NothingFound
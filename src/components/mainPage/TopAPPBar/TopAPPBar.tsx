import './TopAPPBar.css'

const TopAPPBar: React.FC = () => {
  return (
    <div className="TopAPPBar">
      <div className="navigation">
        <img src="./Vector.svg" alt="Иконка поиска" />
        <input placeholder="Введите имя, тег, почту..."></input>
        <img src="./Vector-1.svg" alt="Иконка меню" />
      </div>
      <li className="tabs">
      <ul>Все</ul>
      <ul>Designers</ul>
      <ul>Analysts</ul>
      <ul>Managers</ul>
      <ul>iOS</ul>
      <ul>Android</ul>
    </li>
    <hr />
    </div>
  );
};

export default TopAPPBar;

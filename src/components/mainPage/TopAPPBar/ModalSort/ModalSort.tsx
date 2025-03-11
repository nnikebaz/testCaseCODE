import "./ModalSort.css";

const sortFields = [
  {
    id: "alphabet",
    buttonName: "По алфавиту",
    attributeName: 'sort'
  },
  {
    id: "birthday",
    buttonName: "По дню рождения",
    attributeName: 'sort'
  },
];

const ModalSort: React.FC = () => {
  return (
    <div className="ModalSort">
      <div className="ModalSort__top">
        <img src="./icon-back.svg" alt="Иконка назад" className="ModalSort__icon-back" />
        <h3 className="ModalSort__header">Сортировка</h3>
      </div>
      <div className="ModalSort__content">
        {sortFields.map((field, index) => {
          return (
            <div key={index} className="ModalSort__item">
              <label>
                {field.buttonName}
              <input type="radio" id={field.id} name={field.attributeName}/>
              <span></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalSort;

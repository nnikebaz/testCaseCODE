import { useState } from "react";
import "./ModalSort.css";
import { useSort } from "./SortContext";

interface Props {
  activeMenu: boolean;
  setActiveMenu: (prev: boolean) => void;
}

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


const ModalSort: React.FC<Props> = ({activeMenu, setActiveMenu}) => {
  const [activeBackButton, setActiveBackButton] = useState<boolean>(false)

  const {sortTerm, setSortTerm} = useSort()

  const handleSortChange = (value:string) => {
    setSortTerm(value)

  }

  const handleOnBackButtonClick = ():void => {
    setActiveBackButton((prev) => !prev)
    setActiveBackButton(false)
    setActiveMenu(false)
  }

  return (
    <div className={activeMenu && !activeBackButton ? 'ModalSort active' :  activeMenu && activeBackButton ? 'ModalSort' : 'ModalSort'}>
      <div className="ModalSort__top">
        <img src="./icon-back.svg" alt="Иконка назад" className="ModalSort__icon-back" onClick={handleOnBackButtonClick}/>
        <h3 className="ModalSort__header">Сортировка</h3>
      </div>
      <div className="ModalSort__content">
        {sortFields.map((field, index) => {
          return (
            <div key={index} className="ModalSort__item">
              <label>
                {field.buttonName}
              <input type="radio" id={field.id} name={field.attributeName} onChange={() => handleSortChange(field.id)} checked={field.id === sortTerm}/>
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

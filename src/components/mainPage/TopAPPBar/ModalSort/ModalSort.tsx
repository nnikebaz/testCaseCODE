import { useState } from "react";
import "./ModalSort.css";
import { useSort } from "./SortContext";
import BackButton from "../../../UI/Buttons/BackButton/BackButton";

interface Props {
  activeMenu: boolean;
  setActiveMenu: (prev: boolean) => void;
}

const sortFields = [
  {
    id: "alphabet",
    buttonName: "По алфавиту",
    attributeName: 'sort',
    checked: true,
  },
  {
    id: "birthday",
    buttonName: "По дню рождения",
    attributeName: 'sort',
    checked: false,
  },
];


const ModalSort: React.FC<Props> = ({activeMenu, setActiveMenu}) => {
  const {sortTerm, setSortTerm} = useSort()

  const handleSortChange = (value:string) => {
    setSortTerm(value)
  }

  const handleOnBackButtonClick = () => {
    setActiveMenu(false);
  };

  return (
    <div className={`ModalSort ${activeMenu ? "active" : ""}`}>
      <div className="ModalSort__top">
        <div className="ModalSort__button-wrapper">
          <BackButton onBackButtonClick={handleOnBackButtonClick}/>
        </div>
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

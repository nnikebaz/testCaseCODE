import "./ModalSort.css";
import { useSort } from "../../../../contexts/SortContext";
import CloseButton from "../../../UI/Buttons/CloseButton/CloseButton";
import { useTranslation } from "react-i18next";

interface Props {
  activeMenu: boolean;
  setActiveMenu: (prev: boolean) => void;
}

const ModalSort: React.FC<Props> = ({ activeMenu, setActiveMenu }) => {
  const {t} = useTranslation()
  const { sortTerm, setSortTerm } = useSort();
  const sortFields = [
    {
      id: "alphabet",
      buttonName: t('sort.alphabet'),
      attributeName: "sort",
      checked: true,
    },
    {
      id: "birthday",
      buttonName: t('sort.birthday'),
      attributeName: "sort",
      checked: false,
    },
  ];

  const handleSortChange = (value: string) => {
    setSortTerm(value);
    setActiveMenu(false)
  };

  const handleOnCloseButtonClick = () => {
    setActiveMenu(false);
  };

  const handleOnFilterClick = () => {
    setActiveMenu(false)
  }


  return (
    <>
      {activeMenu && <div className="filter" onClick={handleOnFilterClick}></div>}
      <div className={`ModalSort ${activeMenu ? "active" : ""}`}>
        <div className="ModalSort__top">
          <div className="ModalSort__button-wrapper">
            <CloseButton onCloseButtonClick={handleOnCloseButtonClick}/>
          </div>
          <h3 className="ModalSort__header">{t('sorting')}</h3>
        </div>
        <div className="ModalSort__content">
          {sortFields.map((field, index) => {
            return (
              <div key={index} className="ModalSort__item">
                <label>
                  {field.buttonName}
                  <input
                    type="radio"
                    id={field.id}
                    name={field.attributeName}
                    onChange={() => handleSortChange(field.id)}
                    checked={field.id === sortTerm}
                  />
                  <span></span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ModalSort;

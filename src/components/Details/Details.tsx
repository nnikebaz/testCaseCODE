import React, { useEffect } from "react";
import "./Details.css";
import { useLocation, useNavigate } from "react-router";
import { useUsersContext } from "../MainPage/usersContext";
import phoneIcon from "/phone.svg"
import starIcon from "/star.svg"
import BackButton from "../UI/Buttons/BackButton/BackButton";

const Details: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const parameters = new URLSearchParams(location.search);
  const profileId = parameters.get("id");

  const { stateProfiles, getUsersData, loading } = useUsersContext();
  useEffect(() => {
    if (stateProfiles.length === 0 && !loading) {
      getUsersData("all");
    }
  }, [getUsersData, stateProfiles, loading]);

  const profileData = stateProfiles.find((profile) => profile.id === profileId);
  const fullName = profileData
    ? profileData.firstName + ' ' + profileData.lastName
    : "";
  const userTag = profileData ? profileData.userTag : "";
  const position = profileData ? profileData.position : "";
  const birthday = profileData ? profileData.birthday : '';
  const date = new Date()
  const years = new Date(date.getTime() - new Date(birthday).getTime()).getUTCFullYear() - 1970;
  const yearsToRender = (years: number) => {
    const lastDigit = years % 10;
    const lastTwoDigits = years % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${years} год`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
      return `${years} года`;
    } else {
      return `${years} лет`;
    }
  }

  const birthDateToRender = new Date(birthday).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).slice(0, -3)

  const contactsItems = profileData? [
    {type: 'birthday', value: profileData.birthday, years: yearsToRender(years), icon: starIcon, altIcon: 'иконка звезды'},
    {type: 'phone', value: profileData.phone, icon: phoneIcon, altIcon: 'иконка телефона'},
  ] : [];

  const handleOnBackButtonClick = () => {
    navigate(-1)
  };

  return (
    <div className="Details">
      {profileData && (
        <div className="Details__wrapper">
          <div className="info">
          <div className="Details__button-wrapper">
            <BackButton onBackButtonClick={handleOnBackButtonClick}/>
          </div>
            <img
              className="info__img"
              src={profileData.avatarUrl}
              alt={`Фотография ${fullName}`}
            />
            <div className="info__header">
              <div className="info__name">{fullName}</div>
              <div className="info__tag">{userTag}</div>
            </div>
            <div className="info__position">{position}</div>
          </div>
          <div className="contacts">
          {contactsItems.map((item, index) => {
                  return (
                    <div className="contacts__item" key={index}>
                      <div className="contacts__flexbox">
                      <img src={item.icon} alt={item.altIcon}/>
                      {item.type === 'birthday' ? <div className="contacts__birthday">{birthDateToRender}</div> : <div className="contacts__value">{item.value}</div>}
                      </div>
                      {item.type === 'birthday' ? <div className="contacts__years">{item.years}</div> : ''}
                    </div>
                  )
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;

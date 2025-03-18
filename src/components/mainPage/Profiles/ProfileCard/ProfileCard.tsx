import { Profile } from "../../MainPage";
import { useSort } from "../../TopAPPBar/ModalSort/SortContext";
import "./ProfileCard.css";
import goose from '/goose.png'

interface Props {
  profile: Profile;
  handleClickNavigate: (profileId: string) => void;
}

const ProfileCard: React.FC<Props> = ({ profile, handleClickNavigate }) => {
  const {sortTerm} = useSort()
  // const avatar = `${profile.avatarUrl}`;
  const fullname = `${profile.firstName} ${profile.lastName}`;
  const tag = profile.userTag;
  const position =
    profile.position.charAt(0).toUpperCase() + profile.position.slice(1);
  const birthday = new Date(profile.birthday)
  const normalizeBirthday = (date: Date) => {
    return birthday.getDate() + ' ' + new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(date).slice(0,-1)
  }
  const profileId = profile.id

  return (
    <div className="ProfileCard" onClick={() => handleClickNavigate(profileId)}>
      <div className="ProfileCard__flexbox">
        <img src={goose} alt={`Фото ${fullname}`} className="ProfileCard__img" />
        <div className="ProfileCard__wrapper">
          <div className="ProfileCard__inner">
            <div className="ProfileCard__fullname">{fullname}</div>
            <div className="ProfileCard__tag">{tag}</div>
          </div>
          <div className="ProfileCard__position">{position}</div>
        </div>
      </div>
      {sortTerm === 'birthday' ? <div className="ProfileCard__birthday">{normalizeBirthday(birthday)}</div> : null}
    </div>
  );
};

export default ProfileCard;

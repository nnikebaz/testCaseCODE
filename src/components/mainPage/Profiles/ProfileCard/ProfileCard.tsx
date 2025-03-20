import { useState, useEffect } from "react";
import { Profile } from "../../MainPage";
import { useSort } from "../../../../contexts/SortContext";
import "./ProfileCard.css";
import goose from '/goose.png'
import axios from "axios";
import SkeletonProfileImg from "../../../UI/Skeletons/SkeletonProfileCard/SkeletonProfileImg/SkeletonProfileImg";

interface Props {
  profile: Profile;
  handleClickNavigate: (profileId: string) => void;
}

const ProfileCard: React.FC<Props> = ({ profile, handleClickNavigate }) => {
  const [avatarLoading, setAvatarLoading] = useState<boolean>(true)
  const [avatarIsError, setAvatarIsError] = useState<boolean>(false)
    
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
  const avatar = profile.avatarUrl

  useEffect(() => {
    if (profile.avatarUrl) {
      const fetchAvatar = async () => {
        try {
          const response = await axios.get(profile.avatarUrl, {
            timeout: 3000,
          });
          setAvatarLoading(false)
          return response.data

        } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.code === "ECONNABORTED") {
                console.log('Запрос превысил ожидание');
                setAvatarLoading(false)
                setAvatarIsError(true)
              } else {
                console.error('Ошибка при запросе изображения', error.message)
                setAvatarLoading(false)
                setAvatarIsError(true)
              }
            } else {
              console.error('Неизвестная ошибка при запросе изображения: ', error);
              setAvatarLoading(false)
              setAvatarIsError(true)
            }
        }
      }
      fetchAvatar()
    }
  }, [profile.avatarUrl, setAvatarLoading, setAvatarIsError])

  return (
    <div className="ProfileCard" onClick={() => handleClickNavigate(profileId)}>
      <div className="ProfileCard__flexbox">
        {avatarLoading ? <SkeletonProfileImg/> : <img src={avatarIsError ? goose : avatar} alt={`Фото ${fullname}`} className="ProfileCard__img" />}
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

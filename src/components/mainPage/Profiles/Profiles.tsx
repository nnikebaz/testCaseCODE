import "./Profiles.css";
import { Profile } from "../MainPage";
import NothingFound from "../NothingFound/NothingFound";
import ProfileCard from "./ProfileCard/ProfileCard";
import { useNavigate } from "react-router";
import { useUsersContext } from "../usersContext";
import SkeletonProfileCard from "../../UI/Skeletons/SkeletonProfileCard/SkeletonProfileCard";

interface Props {
  searchTerm: string;
  dataToRender: Profile[];
  nextYearBirthday: Profile[];
}

const Profiles: React.FC<Props> = ({ searchTerm, dataToRender, nextYearBirthday}) => {
  const navigate = useNavigate()
  const handleClickNavigate = (profileId: string) => {
    navigate(`/details?id=${profileId}`)
  }
  const {loading} = useUsersContext()
  const skeletonCount = 11

  return (
    loading ? 
    Array.from({length: skeletonCount}).map((_, index) => (<SkeletonProfileCard key={index}/>)) :
    <div className="Profiles">
      {dataToRender.length > 0 || nextYearBirthday.length > 0 ? (
        dataToRender.map((profile, index) => {
          return <ProfileCard profile={profile} key={index} handleClickNavigate={() => handleClickNavigate(profile.id)}/>;
        })
      ) : searchTerm.length > 0 ? (
        <NothingFound />
      ) : null}
      {nextYearBirthday.length > 0 ? (
        <>
        <div className="next-year">
          <div className="next-year__line"></div>
          <div className="next-year__header">2026</div>
          <div className="next-year__line"></div>
        </div>
          {nextYearBirthday.map((profile, index) => {
            return <ProfileCard profile={profile} key={index} handleClickNavigate={() => handleClickNavigate(profile.id)}/>;
          })}
        </>
      ) : null}
    </div>
  );
};

export default Profiles;

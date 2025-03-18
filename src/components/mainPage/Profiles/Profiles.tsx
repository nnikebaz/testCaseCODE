import "./Profiles.css";
import { Profile, ProfilesGroupByDate } from "../MainPage";
import NothingFound from "../NothingFound/NothingFound";
import ProfileCard from "./ProfileCard/ProfileCard";
import { useSort } from "../TopAPPBar/ModalSort/SortContext";

interface Props {
  searchTerm: string;
  dataToRender: Profile[];
  nextYearBirthday: Profile[];
}

const Profiles: React.FC<Props> = ({ searchTerm, dataToRender, nextYearBirthday}) => {
  return (
    <div className="Profiles">
      {dataToRender.length > 0 ? (
        dataToRender.map((profile, index) => {
          return <ProfileCard profile={profile} key={index}/>;
        })
      ) : searchTerm.length > 0 ? (
        <NothingFound />
      ) : null}
      {nextYearBirthday.length > 0 ? (
        <>
          <div>2026</div>
          {nextYearBirthday.map((profile, index) => {
            return <ProfileCard profile={profile} key={index}/>;
          })}
        </>
      ) : null}
    </div>

  );
};

export default Profiles;

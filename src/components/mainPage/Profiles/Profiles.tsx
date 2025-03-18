import "./Profiles.css";
import { Profile } from "../MainPage";
import NothingFound from "../NothingFound/NothingFound";
import ProfileCard from "./ProfileCard/ProfileCard";

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
        <div className="next-year">
          <div className="next-year__line"></div>
          <div className="next-year__header">2026</div>
          <div className="next-year__line"></div>
        </div>
          {nextYearBirthday.map((profile, index) => {
            return <ProfileCard profile={profile} key={index}/>;
          })}
        </>
      ) : null}
    </div>

  );
};

export default Profiles;

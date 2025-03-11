import "./Profiles.css";
import { Profile } from "../MainPage";

interface Props {
  profiles: Profile[];
}

const Profiles: React.FC<Props> = ({profiles}) => {
  return (
    <div className="profiles">
      {profiles.map((profile: Profile, index: number) => {
        const avatar: string = `${profile.avatarUrl}&random=\${${index}}`;
        const fullname: string = profile.firstName + " " + profile.lastName;
        const tag: string = profile.profileTag
        const position: string = profile.position.charAt(0).toUpperCase() + profile.position.slice(1);
        return (
          <div key={index} className="profiles__item">
            <img
              src={avatar}
              alt={`Фотография ${fullname}`}
              className="profiles__img"
            />
            <div className="profiles__wrapper">
              <div className="profiles__inner">
                <div className="profiles__fullname">{fullname}</div>
                <div className="profiles__tag">{tag}</div>
              </div>
              <div className="profiles__position">{position}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profiles;

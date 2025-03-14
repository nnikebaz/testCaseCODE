import "./Profiles.css";
import { Profile, ProfilesGroupByDate } from "../MainPage";
import NothingFound from "../NothingFound/NothingFound";

interface Props {
  searchTerm: string;
  finalData: { all: Profile[] | ProfilesGroupByDate[] };
}

const Profiles: React.FC<Props> = ({ searchTerm, finalData }) => {
  const isProfilesGroupByDate = (
    item: Profile | ProfilesGroupByDate
  ): item is ProfilesGroupByDate => {
    return "year" in item;
  };

  return (
    <div className="profiles">
      {finalData.all.length > 0 ? (
        finalData.all.map((item, index) => {
          if (isProfilesGroupByDate(item)) {
            return (
              <div key={index} className="profiles__group">
                <h2 className="profiles__year">{item.year}</h2>
                {item.profiles.map((profile, i) => {
                  const avatar = `${profile.avatarUrl}&random=${i}`;
                  const fullname = `${profile.firstName} ${profile.lastName}`;
                  const tag = profile.profileTag;
                  const position =
                    profile.position.charAt(0).toUpperCase() +
                    profile.position.slice(1);

                  return (
                    <div key={profile.id} className="profiles__item">
                      <img
                        src={avatar}
                        alt={`Фото ${fullname}`}
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
          } else {

            const avatar = `${item.avatarUrl}&random=${index}`;
            const fullname = `${item.firstName} ${item.lastName}`;
            const tag = item.profileTag;
            const position =
              item.position.charAt(0).toUpperCase() +
              item.position.slice(1);

            return (
              <div key={item.id} className="profiles__item">
                <img
                  src={avatar}
                  alt={`Фото ${fullname}`}
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
          }
        })
      ) : searchTerm.length > 0 ? (
        <NothingFound />
      ) : null}
    </div>
  );
};

export default Profiles;
import "./Profile.css";
import axios from "axios";

interface User {
  avatarUrl: string;
  birthday: string;
  department: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  position: string;
  userTag: string;
}

interface UserResponse {
  items: User[];
}

async function getUsersData(example: string): Promise<UserResponse | null> {
  try {
    const response = await axios.get<UserResponse>(
      `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${example}`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе", error);
    return null;
  }
}

const allUsersData = await getUsersData("all");

allUsersData?.items.forEach((Element) => {
  console.log(Element);
});

const Profile: React.FC = () => {
  return (
    <div className="profiles">
      {allUsersData?.items.map((user: User, index: number) => {
        const avatarUrl = user.avatarUrl;
        const avatar: string = `${user.avatarUrl}&random=\${${index}}`;
        const fullname: string = user.firstName + " " + user.lastName;
        const tag: string = user.userTag
        const position: string = user.position.charAt(0).toUpperCase() + user.position.slice(1);
        return (
          <div key={index} className="profiles__item">
            <img
              src={avatarUrl}
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

export default Profile;

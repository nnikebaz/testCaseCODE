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
  console.log(Element)
})

const Profile: React.FC = () => {
  return (
    <>
      {allUsersData?.items.map((element: User, index: number) => {
        const avatar:string = `${element.avatarUrl}&random=\${${index}}`
          return (
            <div key={index} className="profile">
              <img src={avatar} alt={`Фотография ${element.firstName} ${element.lastName}`} className="profile_img"/>
              <div>{element.lastName}</div>
            </div>
          )
      })}
    </>
  );
};

export default Profile;

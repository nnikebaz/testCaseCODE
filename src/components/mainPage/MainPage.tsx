import { useCallback, useEffect, useState } from "react";
import "./MainPage.css";
import TopAPPBar from "./TopAPPBar/TopAPPBar";
import axios from "axios";
import Profiles from "./Profile/Profiles";
import { tabs } from "./TopAPPBar/tabsData";
import { useSort } from "./TopAPPBar/ModalSort/SortContext";

export interface Profile {
  avatarUrl: string;
  birthday: string;
  department: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  position: string;
  profileTag: string;
}

interface UserResponse {
  items: Profile[];
}

const MainPage: React.FC = () => {
  const [stateProfiles, setProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Все");
  const [loading, setLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const getUsersData = useCallback(async (example: string) => {
    try {
      setLoading(true)
      const response = await axios.get<UserResponse>(
        `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${example}`
      );
      setProfiles(response.data.items);
      return response.data;
    } catch (error) {
      console.error("Ошибка при запросе", error);
      return null;
    } 
    finally {
      setLoading (false)
    }
  }, []);

  useEffect(() => {
    const selectedTab = tabs[activeTab]
    if (selectedTab) {
      getUsersData(selectedTab)
      console.log(getUsersData(selectedTab))
    }
  }, [getUsersData, activeTab]);

  const filteredProfiles = stateProfiles.filter((profile) => {
    const fullname = `${profile.firstName} ${profile.lastName}`
    const phone = `${profile.phone}`
    return fullname.toLowerCase().includes(searchTerm.toLowerCase()) || phone.includes(searchTerm)
  })

  const sorting = (profiles: Profile[], sortType:string) => {
    if (sortType === 'alphabet') {
      return [...profiles].sort((a,b) => {
        const aFullName = (a.firstName + a.lastName).toLowerCase()
        const bFullName = (b.firstName + b.lastName).toLowerCase()
        return aFullName.localeCompare(bFullName)
      })
    } else if (sortType === 'birthday') {
      return [...profiles].sort((a,b) => {
        return a.birthday.localeCompare(b.birthday)
      })
    }
    return profiles
  }

  return (
    <div className="MainPage">
      <TopAPPBar activeTab={activeTab} onTabChange={handleTabChange} onSearchChange={handleSearchChange}/>
      {loading && <img src="./ios-spinner.min.svg"></img>}
      <Profiles profiles={stateProfiles} filteredProfiles={filteredProfiles} searchTerm={searchTerm} sorting={sorting}/>
    </div>
  );
};

export default MainPage;

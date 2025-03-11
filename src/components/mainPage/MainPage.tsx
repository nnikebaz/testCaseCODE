import { useCallback, useEffect, useState } from "react";
import "./MainPage.css";
import TopAPPBar from "./TopAPPBar/TopAPPBar";
import axios from "axios";
import Profiles from "./Profile/Profiles";
import { tabs } from "./TopAPPBar/tabsData";

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
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Выбрана вкладка ${tab}`);
  };

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

  return (
    <div className="MainPage">
      <TopAPPBar activeTab={activeTab} onTabChange={handleTabChange} />
      {loading && <img src="./ios-spinner.min.svg"></img>}
      <Profiles profiles={stateProfiles} />
    </div>
  );
};

export default MainPage;

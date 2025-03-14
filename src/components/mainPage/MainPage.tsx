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
  year: undefined;
}

export interface ProfilesGroupByDate {
  year: string,
  profiles: Profile[],
}

interface UserResponse {
  items: Profile[];
}

const MainPage: React.FC = () => {
  const [stateProfiles, setProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Все");
  const [loading, setLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const{sortTerm} = useSort()

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
    }
  }, [getUsersData, activeTab]);

  const filteredProfiles = stateProfiles.filter((profile) => {
    const fullname = `${profile.firstName} ${profile.lastName}`
    const phone = `${profile.phone}`
    return fullname.toLowerCase().includes(searchTerm.toLowerCase()) || phone.includes(searchTerm)
  })
  
  const groupByYear = (profiles: Profile[]) => {
    return profiles.reduce((groups, profile) => {
      const year = new Date(profile.birthday).getFullYear().toString();
  
      const groupIndex = groups.findIndex(group => group.year === year);
  
      if (groupIndex === -1) {
        groups.push({ year, profiles: [profile] });
      } else {
        groups[groupIndex].profiles.push(profile);
      }
  
      return groups;
    }, [] as { year: string; profiles: Profile[] }[]).sort((a,b) => Number(a.year) - Number(b.year));
  };


  const sorting = (profiles: Profile[], sortType:string) => {
    if (sortType === 'alphabet') {
      return [...profiles].sort((a,b) => {
        const aFullName = (a.firstName + a.lastName).toLowerCase()
        const bFullName = (b.firstName + b.lastName).toLowerCase()
        return aFullName.localeCompare(bFullName)
      })
    } else if (sortType === 'birthday') {
      console.log(profiles)
      console.log(groupByYear(profiles))
      return groupByYear(profiles)
    }
    return profiles
  }

  const normalizedData = ( data:Profile[] | ProfilesGroupByDate[]) => {
    return { all: data };
  };
  
  const dataToRender = sorting((searchTerm.length > 0 ? filteredProfiles : stateProfiles), sortTerm);
  const finalData = normalizedData(dataToRender)

  return (
    <div className="MainPage">
      <TopAPPBar activeTab={activeTab} onTabChange={handleTabChange} onSearchChange={handleSearchChange}/>
      {loading && <img src="./ios-spinner.min.svg"></img>}
      <Profiles searchTerm={searchTerm} finalData={finalData}/>
    </div>
  );
};

export default MainPage;

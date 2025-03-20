import {  useEffect, useState } from "react";
import "./MainPage.css";
import TopAPPBar from "./TopAPPBar/TopAPPBar";
import Profiles from "./Profiles/Profiles";
import { tabs } from "./TopAPPBar/tabsData";
import { useSort } from "./TopAPPBar/ModalSort/SortContext";
import debounce from "lodash.debounce"
import { useUsersContext } from "./usersContext";
import CriticalError from "../CriticalError/CriticalError";
import NetworkStatus from "../NetworkStatus/NetworkStatus";

export interface Profile {
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


const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Все");
  const [searchTerm, setSearchTerm] = useState<string>('')
  const {sortTerm} = useSort()
  const nextYearBirthday: Profile[] = []
  const {stateProfiles, getUsersData, isError} = useUsersContext()
  
  // полезности
  const today = new Date()
  const sortingByBirthday = (element: Profile[]):Profile[] => {
    return element.sort((a: Profile,b: Profile) => {
      const birthdayA = new Date(a.birthday)
      const birthdayB = new Date(b.birthday)
      const nextYearBirthdayA = new Date(today.getFullYear(), birthdayA.getMonth(), birthdayA.getDate())
      const nextYearBirthdayB = new Date(today.getFullYear(), birthdayB.getMonth(), birthdayB.getDate())

      return nextYearBirthdayA.getTime() - nextYearBirthdayB.getTime()
    })
}

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const debounceSearchTerm = debounce((value: string) => {
    setSearchTerm(value)
  }, 500)

  const handleSearchChange = (value: string) => {
    debounceSearchTerm(value)
  }

  useEffect(() => {
    getUsersData('all')
  }, [getUsersData])


  useEffect(() => {
    const selectedTab = tabs[activeTab]
    if (selectedTab) {
      getUsersData(selectedTab)
    }
  }, [getUsersData, activeTab]);

  const filteredProfiles = stateProfiles.filter((profile) => {
    const fullname = `${profile.firstName} ${profile.lastName}`
    const phone = `${profile.phone}`
    const tag = `${profile.userTag}`

    return fullname.toLowerCase().includes(searchTerm.toLowerCase()) || phone.includes(searchTerm.toLowerCase()) || tag.includes(searchTerm.toLowerCase())
  })

  const sorting = (profiles: Profile[], sortType:string) => {
    if (sortType === 'alphabet') {
      return [...profiles].sort((a,b) => {
        const aFullName = (a.firstName + a.lastName).toLowerCase()
        const bFullName = (b.firstName + b.lastName).toLowerCase()
        return aFullName.localeCompare(bFullName)
      })
    } else if (sortType === 'birthday') {

      const filterThisYearBirthday = [...profiles].filter((profile) => {
        const birthdayDate = new Date(profile.birthday)
        const thisYearBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate())

        if (thisYearBirthday < today) {
          nextYearBirthday.push(profile)
          return false
        }
      return true
      })

      return [...sortingByBirthday(filterThisYearBirthday)]
    }
    return profiles
  }
  
  const dataToRender = sorting((searchTerm.length > 0 ? filteredProfiles : stateProfiles), sortTerm);

  return (
    <>
    <NetworkStatus/>
    {isError ?
    <CriticalError/> :
      <div className="MainPage">
        <TopAPPBar activeTab={activeTab} onTabChange={handleTabChange} onSearchChange={handleSearchChange}/>
        <Profiles searchTerm={searchTerm} dataToRender={dataToRender} nextYearBirthday={sortingByBirthday(nextYearBirthday)}/>
      </div>
    }
    </>
   
  );
};

export default MainPage;

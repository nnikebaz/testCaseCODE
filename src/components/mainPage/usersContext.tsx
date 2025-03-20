import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import axios from "axios";
import { Profile } from "./MainPage";

interface UsersContextType {
  loading: boolean;
  stateProfiles: Profile[];
  isError: boolean;
  getUsersData: (example: string) => Promise<UserResponse | null>
}

interface UserResponse {
  items: Profile[];
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export const useUsersContext = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('Ошибка контекста usersContext')
  }
  return context
}

export const UsersProvider = ({children}: {children: ReactNode}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [stateProfiles, setStateProfiles] = useState<Profile[]>([])
  const test500 = 'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__code=500&__dynamic=true'

  const getUsersData = useCallback(async (example: string) => {
    try {
      setLoading(true)
      const response = await axios.get<UserResponse>(
        `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${example}`
      );
      setStateProfiles(response.data.items);
      return response.data;
    } catch (error) {
      console.error("Ошибка при запросе", error);
      setIsError(true)
      return null;
    } 
    finally {
      setLoading (false)
    }
  }, [setLoading, setStateProfiles]); 

  return (
    <UsersContext.Provider value={{ loading, stateProfiles, isError, getUsersData}}>
      {children}
    </UsersContext.Provider>
  );
}

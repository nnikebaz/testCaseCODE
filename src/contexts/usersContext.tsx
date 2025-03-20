import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import axios from "axios";
import { Profile } from "../components/MainPage/MainPage";

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

const cache: Record<string, {data: UserResponse; timestamp: number}> = {}
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000

export const UsersProvider = ({children}: {children: ReactNode}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [stateProfiles, setStateProfiles] = useState<Profile[]>([])
  // const test500 = 'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__code=500&__dynamic=true'

  const getUsersData = useCallback(async (example: string) => {
    const cacheKey = `users_${example}`;
    const cachedData = cache[cacheKey];
    const now = Date.now()

    if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
      setStateProfiles(cachedData.data.items)
      return cachedData.data
    }

    try {
      setLoading(true)
      const response = await axios.get<UserResponse>(
        `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${example}`
      );
      setStateProfiles(response.data.items);

      cache[cacheKey] = {
        data: response.data,
        timestamp: now,
      }

      setTimeout(() => {
        delete cache[cacheKey]
      }, CACHE_EXPIRATION_TIME)

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

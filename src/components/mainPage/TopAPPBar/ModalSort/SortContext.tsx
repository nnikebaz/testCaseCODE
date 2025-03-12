import { createContext, ReactNode, useContext, useState } from "react";

interface SortContextType {
  sortTerm: string;
  setSortTerm: (value: string) => void;
}

const SortContext = createContext<SortContextType | undefined>(undefined)

export const useSort = () => {
  const context = useContext(SortContext)
  if (!context) {
    throw new Error ('ошибка контекста')
  }
  return context
}

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sortTerm, setSortTerm] = useState<string>("");

  return (
    <SortContext.Provider value={{ sortTerm, setSortTerm }}>
      {children}
    </SortContext.Provider>
  );
};
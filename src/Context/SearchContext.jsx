import { createContext, useState } from "react";

export const SearchContext = createContext(null);

export default function SearchContextProvider({ children }) {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <SearchContext.Provider value={{ isSearch, setIsSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

import { createContext, ReactNode, useState } from "react";
import { DataUser } from "../interfaces/User";

const INITIAL_STATE: DataUser = {
  name: "",
  image: "",
};

interface ContextProps {
  dataUser: DataUser;
  setUser: (data: DataUser) => void;
}

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [dataUser, setDataUser] = useState(INITIAL_STATE);

  const setUser = (data: DataUser) => {
    setDataUser(data);
  };

  return (
    <UserContext.Provider
      value={{
        dataUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

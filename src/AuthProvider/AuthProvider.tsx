import { createContext, useState, type Dispatch, type FC, type ReactNode } from 'react';
import { AUTH_STORAGE } from '../constans';

export interface IAuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<React.SetStateAction<boolean>>;
}

export interface IAuthProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setIsAuth: () => {},
});

export const AuthProvider: FC<IAuthProps> = ( { children } ) => {
  const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE) || "false");
  const [isAuth, setIsAuth] = useState<boolean>(isLogin);

  return (
    <AuthContext.Provider value={ {isAuth, setIsAuth} }>{children}</AuthContext.Provider>
  );
};

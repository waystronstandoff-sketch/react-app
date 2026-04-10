import { createContext, useEffect, useState, type FC, type ReactNode} from 'react';
import { THEME_STORAGE } from '../constans';
import { type IThemeContext, THEME_ENUM } from '../types/types.global';

export const ThemeContext = createContext<IThemeContext>({
  theme: THEME_ENUM.LIGHT,
  setTheme: () => {},
});

export interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<IThemeProviderProps> = ( { children } ) => {

  const savedTheme = (localStorage.getItem(THEME_STORAGE) as THEME_ENUM) || THEME_ENUM.LIGHT;

  const [theme, setTheme] = useState<THEME_ENUM>(savedTheme);

  useEffect(() => {  

    const detectTheme = (): void => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        setTheme(THEME_ENUM.DARK);
        document.body.classList.remove('darkLayout');
      } else {
        savedTheme === THEME_ENUM.DARK && document.body.classList.add('darkLayout');
        setTheme(savedTheme);
      }
    };
    detectTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', detectTheme); 

    return () => {
      mediaQuery.removeEventListener('change', detectTheme);
    };
  }, []);
  

  

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
  );
};

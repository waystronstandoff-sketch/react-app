import type { ChangeEvent } from 'react';
import { THEME_STORAGE } from '../../constans/global.constans';
import { useTheme } from '../../hooks/useTheme';
import { THEME_ENUM } from '../../types/types.global';
import cls from './ThemeToggler.module.css';

export const ThemeToggler = () => {

  const {theme, setTheme} = useTheme();

  const themeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked === true;
    const updateTheme = isChecked ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;
    setTheme(updateTheme);

    isChecked ? document.body.classList.add('darkLayout') : document.body.classList.remove('darkLayout');
    localStorage.setItem(THEME_STORAGE, updateTheme);
  };

  return (
    <label className={cls.switch}>
      <input  type="checkbox" onChange={themeChangeHandler} checked={theme === 'dark'}></input>
      <span className={cls.slider}></span>
    </label>
  );
};

import { THEME_STORAGE } from '../../constans';
import { useTheme } from '../../hooks/useTheme';
import cls from './ThemeToggler.module.css';

export const ThemeToggler = () => {

  const {theme, setTheme} = useTheme();

  const themeChangeHandler = (e) => {
    const isChecked = e.target.checked === true;
    const updateTheme = isChecked ? 'dark' : 'light';
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

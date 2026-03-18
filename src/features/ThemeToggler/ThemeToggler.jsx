import cls from './ThemeToggler.module.css';

export const ThemeToggler = () => {

  return (
    <label className={cls.switch}>
      <input  type="checkbox"></input>
      <span className={cls.slider}></span>
    </label>
  );
};

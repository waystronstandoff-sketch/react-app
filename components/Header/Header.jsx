import { Button } from '../Button';
import cls from './Header.module.css';
import ReactLogo from '../../src/assets/react.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/hooks/useAuth';
import { AUTH_STORAGE } from '../../src/constans';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const loginHandler = () => {
    localStorage.setItem(AUTH_STORAGE, !isAuth);
    setIsAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <p onClick={() => navigate('/')}>
        <img src={ReactLogo} alt="react logo" />
        <span>React Cards</span>
      </p>

      <div className={cls.headerButton}>
        {isAuth && <Button onClick={() => navigate('/addquestion')}> Add </Button>}
        <Button onClick={loginHandler} isActive={!isAuth}>{isAuth ? 'Logout' : 'Login'}</Button>
      </div>
    </header>
  );
};

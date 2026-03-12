import { ToastContainer } from 'react-toastify';
import { Header } from '../Header';
import cls from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from '../Loader';

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
    
  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
          <footer className={cls.footer}> React Question Cards Application | {currentYear} <br />
            by Bolotnikov Kirill </footer>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

import cls from './Badge.module.css';

export const Badge = ( {variant, children} ) => {

  switch (variant) {
  case 'primary':
    return <div className={`${cls.badge} ${cls.primary}`}> {children} </div>;
  case 'succes':
    return <div className={`${cls.badge} ${cls.succes}`}> {children} </div>;
  case 'warn':
    return <div className={`${cls.badge} ${cls.warn}`}> {children} </div>;
  case 'alert':
    return <div className={`${cls.badge} ${cls.alert}`}> {children} </div>;
  default:
    return <div className={cls.badge}> {children} </div>;

  }

    
};

import cls from './Badge.module.css';
import { type FC, type ReactNode } from 'react';
import { BADGE_ENUM } from '../../src/types/types.global'

export interface IBadgeProps {
  children: ReactNode;
  variant: BADGE_ENUM;
}

export const Badge: FC<IBadgeProps> = ( {variant, children} ) => {

  switch (variant) {
  case BADGE_ENUM.PRIMARY:
    return <div className={`${cls.badge} ${cls.primary}`}> {children} </div>;
  case BADGE_ENUM.SUCCESS:
    return <div className={`${cls.badge} ${cls.success}`}> {children} </div>;
  case BADGE_ENUM.WARN:
    return <div className={`${cls.badge} ${cls.warn}`}> {children} </div>;
  case BADGE_ENUM.ALERT:
    return <div className={`${cls.badge} ${cls.alert}`}> {children} </div>;
  default:
    return <div className={cls.badge}> {children} </div>;

  }
};

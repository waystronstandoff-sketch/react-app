import { useContext } from 'react';
import { AuthContext, type IAuthContext } from '../AuthProvider/AuthProvider';

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};
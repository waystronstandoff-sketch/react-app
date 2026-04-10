import { useContext } from 'react';
import { AuthContext} from '../AuthProvider/AuthProvider';
import type { IAuthContext } from '../types/types.global';

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};
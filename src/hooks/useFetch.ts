import { toast } from 'react-toastify';
import { delayFn } from '../helpers/delayFn';
import { useState } from 'react';


export const useFetch = (callback: (...args: any[]) => void): [(...args: any[]) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFn = async(...arg: any[]) => {
    try {
      setIsLoading(true);
      setError('');
      await delayFn();

      const response = await callback(...arg);

      return response;

    } catch (error: any) {
      setError(error?.message);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error];
};
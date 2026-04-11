import { useId, type ChangeEvent, type FC } from 'react';
import cls from './SearchInput.module.css';
import { SearchIcon } from '../icons';

export interface ISearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: FC<ISearchInputProps> = ( { value, onChange } ) => {
  const inputId = useId();

  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}> <SearchIcon className={cls.searchIcon}/> </label>
      <input className={cls.searchInput} id={inputId} type="text" value={value} onChange={onChange} placeholder="Search..."/>
    </div>
  );
};

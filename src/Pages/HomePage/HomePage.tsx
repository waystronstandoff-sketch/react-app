import { useEffect, useMemo, useState, useRef, type ChangeEvent, type MouseEvent } from 'react';
import { API_URL } from '../../constans/global.constans';
import cls from './HomePage.module.css';
import { QuestionCardList } from '../../../components/QuestionCardList';
import { Loader } from '../../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../../components/SearchInput/SearchInput';
import { Button } from '../../../components/Button';
import type { IQuestionCardEdit } from '../../types/types.global';

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState<string>(`_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState<IQuestionCardEdit | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortSelect, setSortSelect] = useState<string>('');
  const [countSelect, setCountSelect] = useState<string>('');

  const controlsContainerRef = useRef<HTMLDivElement>(null);

  const getActivePageNumber = () => (questions!.next === null ? questions!.last : questions!.next - 1);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  const cards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const pageCount = questions?.pages || 0;
    return Array(pageCount).fill(0).map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react?${searchParams}`);
  }, [searchParams]);

  const onSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortSelect(e.target.value);
    setSearchParams(`_page=1&_per_page=${countSelect}&${e.target.value}`);
  };

  const paginationHandler = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      setSearchParams(`_page=${(e.target as HTMLElement).textContent}&_per_page=${countSelect}&${sortSelect}`);
      controlsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onChangeCountSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountSelect(e.target.value);
    setSearchParams(`_page=1&_per_page=${e.target.value}&${sortSelect}`);
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput value={searchValue} onChange={onSearchValueHandler} />

        <select value={sortSelect} className={cls.select} onChange={onSortSelectChangeHandler}>
          <option value="">Sort by</option>

          <hr />

          <option value={'_sort=level'}>Level ASC</option>
          <option value={'_sort=-level'}>Level DESC</option>
          <option value={'_sort=completed'}>Completed ASC</option>
          <option value={'_sort=-completed'}>Completed DESC</option>
        </select>

        <select value={countSelect} className={cls.select} onChange={onChangeCountSelectHandler}>
          <option value="count">10</option>

          <hr />

          <option value={'20'}>20</option>
          <option value={'30'}>30</option>
          <option value={'40'}>40</option>
          <option value={'50'}>50</option>
          <option value={'100'}>100</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards} />

      {cards.length === 0 ? (
        <p className={cls.noCards}>No cards...</p>
      ) : (
        pagination.length > 1 && (
          <div className={cls.paginationContainer} onClick={paginationHandler}>
            {pagination.map((value) => {
              return <Button key={value} isActive={value === getActivePageNumber()}>{value}</Button>;
            })}
          </div>
        )
      )
      }
    </>
  );
};

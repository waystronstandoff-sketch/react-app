import { useEffect, useMemo, useState, useRef } from "react";
import { API_URL } from "../../constans";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../../components/QuestionCardList";
import { Loader } from "../../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../../components/SearchInput/SearchInput";
import { Button } from "../../../components/Button";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(`_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortSelect, setSortSelect] = useState("");

  const controlsContainerRef = useRef();

  const getActivePageNumber = () => (questions.next === null ? questions.last : questions.next - 1);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  })

  const cards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
      } else {
        return questions.data
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const pageCount = questions?.pages || 0;
    return Array(pageCount).fill(0).map((_, i) => i + 1)
  }, [questions])

  useEffect(() => {
    getQuestions(`react?${searchParams}`);
  }, [searchParams]);

  const onSearchValueHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelect(e.target.value);
    setSearchParams(`_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`)
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === 'BUTTON') {
      setSearchParams(`_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${searchParams}`);
      controlsContainerRef.current.scrollIntoView( {behavior: "smooth"} );
    }
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput value={searchValue} onChange={onSearchValueHandler}/>

        <select value={sortSelect} className={cls.select} onChange={onSortSelectChangeHandler}>
          <option value="">Sort by</option>

          <hr />

          <option value={"_sort=level"}>Level ASC</option>
          <option value={"_sort=-level"}>Level DESC</option>
          <option value={"_sort=completed"}>Completed ASC</option>
          <option value={"_sort=-completed"}>Completed DESC</option>
        </select>
      </div>
      
      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards}/>

      {cards.length === 0 ? <p>No cards...</p> : 
      <div className={cls.paginationContainer} onClick={paginationHandler}>
        {pagination.map((value) => {
          return <Button key={value} isActive={value === getActivePageNumber()}>{value}</Button>
        })}
      </div>}
      
    </>
  );
};

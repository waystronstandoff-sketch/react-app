import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../constans";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../../components/QuestionCardList";
import { Loader } from "../../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../../components/SearchInput/SearchInput";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelect, setSortSelect] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  })

  const cards = useMemo(() => {
    return questions.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
  }, [questions, searchValue])

  useEffect(() => {
    getQuestions(`react?${sortSelect}`);
  }, [sortSelect]);

  const onSearchValueHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelect(e.target.value)
  }

  return (
    <>
      <div className={cls.controlsContainer}>
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
      {cards.length === 0 && <p>No cards...</p>}

      <QuestionCardList cards={cards}/>
    </>
  );
};

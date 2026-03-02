import { useEffect, useState } from "react";
import { API_URL } from "../../constans";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../../components/QuestionCardList";
import { Loader } from "../../../components/Loader";
import { delayFn } from "../../helpers/delayFn";
import { useFetch } from "../../hooks/useFetch";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  })

  

  useEffect(() => {
    getQuestions("react");
  }, []);

  const searchValueHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <input type="text" value={searchValue} onChange={searchValueHandler}/>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList cards={questions}/>
    </>
  );
};

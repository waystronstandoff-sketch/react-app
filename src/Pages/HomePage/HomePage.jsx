import { useEffect, useState } from "react";
import { API_URL } from "../../constans";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../../components/QuestionCardList";
import { Loader } from "../../../components/Loader";
import { delayFn } from "../../helpers/delayFn";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      await delayFn();
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();

      setQuestions(questions);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <QuestionCardList cards={questions}/>
    </>
  );
};

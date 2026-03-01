import { useEffect, useState } from "react";
import { QuestionCard } from "../../../components/QuestionCard";
import { API_URL } from "../../constans";
import cls from "./HomePage.module.css";
import { QuestionCardList } from "../../../components/QuestionCardList";

const cards = [];

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();

      setQuestions(questions);
    } catch (error) {}
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <QuestionCardList cards={questions}/>
    </>
  );
};

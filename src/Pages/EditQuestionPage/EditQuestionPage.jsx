import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch.js';
import { API_URL } from '../../constans';
import { Loader } from '../../../components/Loader';
import cls from './EditQuestionPage.module.css';
import { useEffect, useState } from 'react';
import { EditQuestion } from './EditQuestion.jsx';

export const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();

    setQuestion(data);
    
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      {isQuestionLoading && <Loader />}
      {question && <EditQuestion initialState={question}/>}
    </>
  );
};

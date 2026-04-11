import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch.js';
import { API_URL } from '../../constans/global.constans.js';
import { Loader } from '../../../components/Loader/index.js';
import { useEffect, useState } from 'react';
import { EditQuestion } from './EditQuestion.jsx';
import { type IQuestionCard } from '../../types/types.global.js';

const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<IQuestionCard | null>(null);

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

export default EditQuestionPage;

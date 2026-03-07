import cls from './QuestionPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { useId, useState } from 'react';

const card = {  
  id: '1',
  question: 'Что такое React?',
  answer: 'React — это библиотека для создания пользовательских интерфейсов.',
  description: 'React — это JavaScript-библиотека, разработанная Facebook, которая используется для построения UI с компонентным подходом. React позволяет вам создавать пользовательские интерфейсы из отдельных частей, называемых компонентами.',
  resources: [
    'https://react.dev',
    'https://react.dev/reference/react'
  ],
  level: 1,
  completed: true,
  editDate: '03.02.2025, 19:49'
};

export const QuestionPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxId = useId();
  const navigate = useNavigate();

  const levelVariant = 
  card.level === 1 ? 'primary' : 
    card.level === 2 ? 'warn' : 
      card.level === 3 ? 'alert' : '';
  const statusCard = card.completed ? 'succes' : 'primary';

  const onCheckboxChangeHandler = () => {};

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={statusCard}>{card.completed ? 'Completed' : 'Not completed'}</Badge>
        {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
      </div>

      <h5 className={cls.cardTitle}>{card.question}</h5>

      <p className={cls.cardDescription}>{card.description}</p>

      <div className={cls.cardAnswers}>
        <label>short answer: </label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>


      <ul className={cls.cardLinks}>
        Resources:
        {
          card.resources.map((link, index) => {
            return (<li key={index}>
              <a href={link.trim()} target="_blank" rel="noreferrer">{link.trim()}</a>
            </li>);
          })
        }
      </ul>

      <label htmlFor={checkboxId} className={cls.cardCheckbox}>
        <input type="checkbox" className={cls.checkbox} id={checkboxId} checked={isChecked} onChange={onCheckboxChangeHandler} disabled={false}/>
        <span>mark question as completed</span>
      </label>

      <Button onClick={() => navigate(`/editquestion/${card.id}`)}>Edit Question</Button>
      <Button onClick={() => navigate('/')}>Back</Button>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import cls from './QuestionCard.module.css';
import { Badge } from '../Badge';

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  const levelVariant = 
    card.level === 1 ? 'primary' : 
      card.level === 2 ? 'warn' : 
        card.level === 3 ? 'alert' : '';
  const statusCard = card.completed ? 'success' : 'primary';

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={statusCard}>{card.completed ? 'Completed' : 'Not completed'}</Badge>
      </div>

      <h5 className={cls.cardTitle}>{card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>short answer: </label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>

      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};

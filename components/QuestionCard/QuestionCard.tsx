import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import cls from './QuestionCard.module.css';
import { Badge } from '../Badge';
import { BADGE_ENUM, type IQuestionCard } from '../../src/types/types.global';
import type { FC } from 'react';

export interface IQuestionCardProps {
  card: IQuestionCard;
}

export const QuestionCard: FC<IQuestionCardProps> = ({ card }) => {
  const navigate = useNavigate();

  const levelVariant = 
    card.level === 1 ? BADGE_ENUM.PRIMARY : card.level === 2 ? BADGE_ENUM.WARN : BADGE_ENUM.ALERT;
    
  const statusCard = card.completed ? BADGE_ENUM.SUCCESS : BADGE_ENUM.PRIMARY;

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

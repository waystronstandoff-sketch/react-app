import { QuestionCard } from '../QuestionCard/QuestionCard';
import { memo, type FC } from 'react';
import cls from './QuestionCardList.module.css';
import type { IQuestionCard } from '../../src/types/types.global';

export interface IQuestionCardListProps {
  cards: IQuestionCard[];
}

export const QuestionCardList: FC<IQuestionCardListProps> = memo(( {cards} ) => {
  return (
    <div className={cls.cardList}>
      {cards.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </div>
  );
});

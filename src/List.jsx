import { } from 'react';

const items = [
    {
        task: 'Выучить React',
        icon: '❌',
        isCompleted: false
    },
    {
        task: 'Закрепить JS',
        icon: '💙',
        isCompleted: true
    },
    {
        task: 'Быть красавчиком',
        icon: '🍉',
        isCompleted: true
    },
]

export const List = () => {

    return (
      <div>
        {
            items.map((item, index) => {
                return (
                    <section className={item.isCompleted ? 'completed' : "not-completed"} key={index}>
                        <span>{item.icon}</span>
                        <h4>{item.task}</h4>
                    </section>
                )
            })
        }
      </div>
    );
};

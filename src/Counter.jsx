import { useState } from 'react';

export const Counter = () => {

    const [count, setCount] = useState(0);

    const setCountHandler = () => {
        setCount((prev) => prev + 1)
    }

    return (
        <button onClick={() => setCountHandler()}>
          count is {count}
        </button>
    );
};

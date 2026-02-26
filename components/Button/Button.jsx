import { } from 'react';
import cls from "./Button.module.css";

// const inlineStyles = {
//     color: "lightsalmon",
//     backgroundColor: "grey"
// }

const isPrimary = true;

export const Button = ({ onClick, children }) => {
    // console.log(props)

    return (
      <button className={`${cls.btn} ${isPrimary ? cls.primary : ""}`} onClick={onClick}
      > {children} </button>
    );
};



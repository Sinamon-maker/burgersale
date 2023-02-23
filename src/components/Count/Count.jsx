import { useState } from "react";
import style from "./Count.module.css";

export const Count = ({ count }) => {
  const [counts, setCount] = useState(count);

  const addCount = () => {
    setCount(counts + 1);
  };

  const removeCount = () => {
    if (counts > 0) {
      setCount(counts - 1);
    }
  };

  return (
    <div className={style.count}>
      <button
        className={style.count__minus}
        disabled={counts === 0}
        onClick={removeCount}
      >
        -
      </button>
      <p className={style.count__amount}>{counts}</p>
      <button className={style.count__plus} onClick={addCount}>
        +
      </button>
    </div>
  );
};

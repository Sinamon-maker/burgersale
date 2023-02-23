import { Container } from "../Container/Container";
import style from "./Navigation.module.css";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import {
  categoryRequestAsync,
  changeCategory,
} from "../../store/category/categorySlice";
import { API_URI } from "../../const";
import { useEffect } from "react";

export const Navigation = () => {
  const { category, activeCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryRequestAsync());
  }, []);

  const handleChange = (ind) => {
    dispatch(changeCategory({ indexCategory: ind }));
  };

  return (
    <>
      <nav className={style.navigation}>
        <Container>
          <ul className={style.navigation__list}>
            {category.map((item, ind) => (
              <li key={ind} className={style.navigation__item}>
                <button
                  className={classNames(
                    style.navigation__button,

                    activeCategory === ind
                      ? style.navigation__button_active
                      : ""
                  )}
                  style={{ backgroundImage: `url(${API_URI}/${item.image})` }}
                  onClick={() => handleChange(ind)}
                >
                  {item.rus}
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </>
  );
};

import style from "./Product.module.css";
import { API_URI } from "../../const";
import { addProduct } from "../../store/order/orderSlice";
import { useDispatch } from "react-redux";

export const CatalogProduct = ({ good }) => {
  const dispatch = useDispatch();
  return (
    <article className={style.product}>
      <img
        src={`${API_URI}/${good.image}`}
        alt={good.title}
        className={style.product__image}
      />

      <p className={style.product__price}>
        {good.price}
        <span className={style.currency}>₽</span>
      </p>

      <h3 className={style.product__title}>
        <button className={style.product__detail}>{good.title}</button>
      </h3>

      <p className={style.product__weight}>{good.weight}г</p>

      <button
        className={style.product__add}
        type="button"
        onClick={() => dispatch(addProduct({ id: good.id }))}
      >
        Добавить
      </button>
    </article>
  );
};

import style from "./Order.module.css";
import classNames from "classnames";
import { OrderGoods } from "../OrderGoods/OrderGoods";
import { openModal } from "../../store/modalDelivery/modalDeliverySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { orderRequestAsync } from "../../store/order/orderSlice";

export const Order = () => {
  const { totalPrice, totalCount, orderList, orderGoods } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderRequestAsync());
  }, [orderList.length]);

  return (
    <div className={classNames(style.catalog__order, style.order)}>
      <section className={style.order__wrapper}>
        <div className={style.order__header} tabIndex="0" role="button">
          <h2 className={style.order__title}>Корзина</h2>

          <span className={style.order__count}>{totalCount}</span>
        </div>

        <div className={style.order__wrap_list}>
          <ul className={style.order__list}>
            {orderGoods.map((order) => (
              <OrderGoods key={order.id} {...order} />
            ))}
          </ul>

          <div className={style.order__total}>
            <p>Итого</p>
            <p>
              <span className={style.order__amount}>{totalPrice}</span>
              <span className="currency">&nbsp;₽</span>
            </p>
          </div>

          <button
            className={style.order__submit}
            disabled={orderList.length === 0}
            onClick={() => dispatch(openModal())}
          >
            Оформить заказ
          </button>

          <div className={style.order__apeal}>
            <p className={style.order__text}>Бесплатная доставка</p>
            <button className={style.order__close}>Свернуть</button>
          </div>
        </div>
      </section>
    </div>
  );
};

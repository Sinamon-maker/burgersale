import { Order } from "../Order/Order";
import { Container } from "../Container/Container";
import { CatalogProduct } from "../CatalogProduct/CatalogProduct";

import style from "./Catalog.module.css";
console.log("hhhh", style.catalog__item);
const goodsList = [
  { title: "Мясная бомба" },
  { title: "Супер сырный" },
  { title: "Сытный" },
  { title: "Итальянский" },
  { title: "Вечная классика" },
  { title: "Тяжелый удар" },
];

export const Catalog = () => {
  return (
    <>
      <section className={style.catalog}>
        <Container styleName={style.catalog__container}>
          <Order />

          <div className={style.catalog__wrapper}>
            <h2 className={style.catalog__title}>Бургеры</h2>

            <div className={style.catalog__wrap_list}>
              <ul className={style.catalog__list}>
                {goodsList.map((good, index) => (
                  <li key={index} className={style.catalog__item}>
                    <CatalogProduct good={good} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

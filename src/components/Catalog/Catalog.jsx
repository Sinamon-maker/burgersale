import { Order } from "../Order/Order";
import { Container } from "../Container/Container";
import { CatalogProduct } from "../CatalogProduct/CatalogProduct";

import style from "./Catalog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productRequestAsync } from "../../store/product/productSlice";

export const Catalog = () => {
  const { products } = useSelector((state) => state.products);
  const { category, activeCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category.length) {
      dispatch(productRequestAsync(category[activeCategory].title));
    }
  }, [category, activeCategory]);
  return (
    <>
      <section className={style.catalog}>
        <Container styleName={style.catalog__container}>
          <Order />

          <div className={style.catalog__wrapper}>
            <h2 className={style.catalog__title}>
              {category[activeCategory]?.rus}
            </h2>

            <div className={style.catalog__wrap_list}>
              <ul className={style.catalog__list}>
                {products.map((good) => (
                  <li key={good.id} className={style.catalog__item}>
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

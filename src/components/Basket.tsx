'use client'
import {useState} from "react";
import {useAppSelector} from "@/hooks/redux";
import parser from "postcss-selector-parser";

export default function Basket() {
  const [isShowBasket, setIsShowBasket] = useState(true);
  const {baskets} = useAppSelector(state => state.basket)

  return (
    <div className="catalog__order order">
      <section className={`order__wrapper ${isShowBasket ? 'order_open' : ''}`}>  {/*<!-- order_open -->*/}
        <div className="order__wrap-title" tabIndex={0} role="button">
          <h2 className="order__title">Корзина</h2>

          <span className="order__count">4</span>
        </div>
        {isShowBasket ? (
          <div>
            {baskets.length > 0 ? (
              <div className="order__wrap_list ">
                <ul className="order__list">
                  {baskets.map(p => (
                    <li key={p.id} className="order__item">
                      <img src={p.img} alt="Супер сырный" className="order__image"/>

                      <div className="order__product">
                        <h3 className="order__product-title">{p.name}</h3>

                        <p className="order__product-weight">{p.weight}г</p>

                        <p className="order__product-price">{p.price}
                          <span className="currency">₽</span>
                        </p>
                      </div>

                      <div className="order__product-count count">
                        <button className="count__minus">-</button>
                        <p className="count__amount">1</p>
                        <button className="count__plus">+</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="order__total">
                  <p>Итого</p>
                  <p>
                    <span className="order__total-amount">1279</span>
                    <span className="currency">₽</span>
                  </p>
                </div>

                <button className="order__submit">Оформить заказ</button>

                <div className="order__wrap-appeal">
                  <p className="order__appeal">Бесплатная доставка</p>
                  <button onClick={() => setIsShowBasket(false)} className="order__close">Свернуть</button>
                </div>
              </div>
            ) : (
              <p className="order__empty">Корзина пуста :(</p>
            )}

          </div>
        ) : (
          <div className="order__wrap-appeal" style={{marginTop: '8px'}}>
            <button onClick={() => setIsShowBasket(true)} className="order__close">
              Развернуть
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
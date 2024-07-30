'use client'
import {useEffect, useState} from "react";
import {useAppSelector} from "@/hooks/redux";
import {useActions} from "@/hooks/actions";
import {Trash} from "lucide-react";
import ModalDelivery from "@/components/modal/ModalDelivery";

export default function Basket() {
  const [isShowBasket, setIsShowBasket] = useState<boolean>(true)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isDeliveryModal, setIsDeliveryModal] = useState<boolean>(false)


  const {baskets} = useAppSelector(state => state.basket)
  const {
    increaseCountOfProduct,
    decreaseCountOfProduct,
    removeAllProductInBasket
  } = useActions()


  useEffect(() => {
    setTotalAmount(baskets.reduce((total, product) => total + product?.amount!, 0))
    setTotalPrice(baskets.reduce((total, product) => total + (product.price * product.amount!), 0))
  }, [baskets])

  return (
    <div className="catalog__order order">
      <section className={`order__wrapper ${isShowBasket ? 'order_open' : ''}`}>  {/*<!-- order_open -->*/}
        <div className="order__wrap-title" tabIndex={0} role="button">
          <h2 className="order__title">Корзина</h2>

          <div style={{display: 'flex', gap: 4}}>
            {baskets.length > 0 && (
              <Trash onClick={() => {setIsShowBasket(true); return removeAllProductInBasket()}} style={{cursor: "pointer"}} size={16} color="red"/>
            )}
            <span className="order__count">{totalAmount}</span>
          </div>
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
                        <button onClick={() => decreaseCountOfProduct(p)} className="count__minus">-</button>
                        <p className="count__amount">{p.amount}</p>
                        <button onClick={() => increaseCountOfProduct(p)} className="count__plus">+</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="order__total">
                  <p>Итого</p>
                  <p>
                    <span className="order__total-amount">{totalPrice}</span>
                    <span className="currency">₽</span>
                  </p>
                </div>

                <button onClick={() => setIsDeliveryModal(true)} className="order__submit">Оформить заказ</button>

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

      <ModalDelivery
        isDeliveryModal={isDeliveryModal}
        closeDeliveryModal={() => setIsDeliveryModal(false)}
      />
    </div>
  )
}
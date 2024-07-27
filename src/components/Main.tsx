'use client'

import Catalog from "./Catalog";
import Basket from "./Basket";
import ModalProduct from "./modal/ModalProduct";
import ModalDelivery from "./modal/ModalDelivery";
import products from "../../public/products.json";
import {useActions} from "@/hooks/actions";
import {IProduct} from "@/types/product.types";

export default function Main() {

  const {addBasket} = useActions()

  const addToBasket = (product: IProduct) => {
    addBasket(product)
  }
  return (
    <main>
      <Catalog />
      <section className="catalog">
        <div className="container catalog__container">
          <Basket />

          <div className="catalog__wrapper">
            <h2 className="catalog__title">Бургеры</h2>

            <div className="catalog__wrap_list">
              <ul className="catalog__list">
                {products.map(product => (
                  <li className="catalog__item" key={product.id}>
                    <article className="product">
                      <img src={product.img} alt={product?.name} className="product__image"/>
                      <div className="product__price">{product.price} <span className="currency">₽</span></div>
                      <h3 className="product__title">
                        <button className="product__detail">{product?.name}</button>
                      </h3>
                      <p className="product__weight">{product.weight}г</p>
                      <button onClick={() => addToBasket(product)} className="product__add" type="button">Добавить</button>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ModalProduct/>
      <ModalDelivery/>
    </main>
  )
}
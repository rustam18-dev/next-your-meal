'use client'

import Catalog from "./Catalog";
import Basket from "./Basket";
import ModalProduct from "./modal/ModalProduct";
import ModalDelivery from "./modal/ModalDelivery";
import products from "../../public/products.json";
import {IProduct} from "@/types/product.types";
import {useIsExistProduct} from "@/hooks/product/useIsExistProduct";
import {useState} from "react";


export default function Main() {
  const [isDetailProduct, setIsDetailProduct] = useState<boolean>(false)
  const [productForModal, setProductForModal] = useState<IProduct>({
    id: 0,
    amount: 0,
    description: '',
    img: '',
    calories: '',
    name: '',
    price: 0,
    weight: '',
    ingredients: []
  })
  const toShowInDetail = (product: IProduct) => {
    setIsDetailProduct(true)

    setProductForModal(product)
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
                      <button onClick={() => toShowInDetail(product)} className="product__add" type="button">
                        {useIsExistProduct(product.id) ? 'В корзине' : 'Подробнее'}
                      </button>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ModalProduct
        isDetailProduct={isDetailProduct}
        product={productForModal}
      />
      <ModalDelivery />
    </main>
  )
}
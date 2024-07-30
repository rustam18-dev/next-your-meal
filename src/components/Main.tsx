'use client'

import Catalog from "./Catalog";
import Basket from "./Basket";
import ModalProduct from "./modal/ModalProduct";
import ModalDelivery from "./modal/ModalDelivery";
import products from "../../public/products.json";
import {IProduct} from "@/types/product.types";
import {useIsExistProduct} from "@/hooks/product/useIsExistProduct";
import {useState} from "react";
import {useActions} from "@/hooks/actions";


export default function Main() {
  const [isDetailProduct, setIsDetailProduct] = useState<boolean>(false)
  const {previewProduct} = useActions()

  const toShowInDetail = (product: IProduct) => {
    previewProduct(product)
    setIsDetailProduct(true)
  }

  return (
    <main>
      <Catalog/>
      <section className="catalog">
        <div className="container catalog__container">
          <Basket/>
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
                      <p className="product__weight">{product.weight}</p>
                      {useIsExistProduct(product.id) ? (
                        <button style={{cursor: 'not-allowed'}}  className="product__add" type="button">
                          В корзине
                        </button>
                      ) : (
                        <button onClick={() => toShowInDetail(product)} className="product__add" type="button">
                          Подробнее
                        </button>
                      )}
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
        closeModal={(data: boolean) => setIsDetailProduct(data)}
      />
    </main>
  )
}
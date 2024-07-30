import {useActions} from "@/hooks/actions";
import {useAppSelector} from "@/hooks/redux";

type Props = {
  isDetailProduct: boolean
  closeModal: (data: boolean) => void
}

export default function ModalProduct({isDetailProduct, closeModal}: Props) {
  const {
    addBasket,
    increaseCountOfProduct,
    decreaseCountOfProduct,
  } = useActions()

  const {previewProduct: product} = useAppSelector(state => state.basket)

  return (
    <div className={`modal modal_product ${isDetailProduct && 'modal_open'}`}>
      <div className="modal__main modal-product">
        <div className="modal-product__container">
          <h2 className="modal-product__title">{product.name}</h2>

          <div className="modal-product__content">
            <img src={product.img} alt="Мясная бомба" className="modal-product__image" />

              <p className="modal-product__description">{product.description}</p>

              <div className="modal-product__ingredients ingredients">
                <h3 className="ingredients__title">Состав:</h3>

                <ul className="ingredients__list">
                  {product.ingredients.map(i => (

                    <li key={i} className="ingredients__item">{i}</li>
                  ))}
                </ul>

                <p className="ingredients__calories">{product.weight}, {product.calories}</p>
              </div>

              <div className="modal-product__footer">

                <div className="modal-product__add">
                  <button onClick={() => {
                    closeModal(false)
                    addBasket(product)
                  }} className="modal-product__btn">Добавить</button>

                  <div className="modal-product__count count">
                    <button onClick={() => decreaseCountOfProduct(product)} style={product.amount! === 1 ? {cursor: "not-allowed"} : {}} className="count__minus">-</button>
                    <p className="count__amount">{product.amount}</p>
                    <button onClick={() => increaseCountOfProduct(product)} className="count__plus">+</button>
                  </div>
                </div>

              </div>
              <p className="modal-product__price">{product.price}
                <span className="currency">₽</span>
              </p>
          </div>
        </div>

        <button onClick={() => closeModal(false)} className="modal__close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)"/>
            <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
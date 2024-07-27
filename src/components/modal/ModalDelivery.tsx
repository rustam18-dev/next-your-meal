export default function ModalDelivery() {
  return (
    <div className="modal modal_delivery "> {/* modal_open */}
      <div className="modal__main modal-delivery">
        <div className="modal-delivery__container">
          <h2 className="modal-delivery__title">Доставка</h2>

          <form className="modal-delivery__form" id="delivery">
            <fieldset className="modal-delivery__fieldset">
              <input className="modal-delivery__input" type="text" placeholder="Ваше имя" />
              <input className="modal-delivery__input" type="tel" placeholder="Телефон" />
            </fieldset>

            <fieldset className="modal-delivery__fieldset modal-delivery__fieldset_radio">
              <label className="modal-delivery__label">
                <input className="modal-delivery__radio" type="radio" name="format" value="pickup" />
                <span>Самовывоз</span>
              </label>
              <label className="modal-delivery__label">
                <input className="modal-delivery__radio" type="radio" name="format" value="delivery" defaultChecked />
                <span>Доставка</span>
              </label>
            </fieldset>

            <fieldset className="modal-delivery__fieldset">
              <input className="modal-delivery__input" type="text" placeholder="Улица, дом, квартира" />
              <input className="modal-delivery__input modal-delivery__input_half" type="number" placeholder="Этаж" />
              <input className="modal-delivery__input modal-delivery__input_half" type="number" placeholder="Домофон" />
            </fieldset>
          </form>

          <button className="modal-delivery__submit" type="submit" form="delivery">Оформить</button>
        </div>

        <button className="modal__close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)" />
            <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)" />
          </svg>
        </button>
      </div>
    </div>
  );
}

import {SubmitHandler, useForm} from "react-hook-form";
import {IDelivery} from "@/types/delivery.types";
import {Simulate} from "react-dom/test-utils";
import {useActions} from "@/hooks/actions";

type Props = {
  isDeliveryModal: boolean
  closeDeliveryModal: (isOpen: boolean) => void
}

export default function ModalDelivery({isDeliveryModal, closeDeliveryModal}: Props) {
  const {register, handleSubmit, watch, formState: {errors}, reset} = useForm<IDelivery>({
    defaultValues: {
      delivery: "delivery",
    }
  })
  const {clearBasket} = useActions()

  const submit: SubmitHandler<IDelivery> = data => {
    alert('Заказ успешно сделан!')
    reset({
      name: '',
      phone: '',
      delivery: "delivery",
      address: '',
    })
    clearBasket()
    closeDeliveryModal(false)
  }
  const delivery = watch('delivery')

  return (
    <div className={`modal modal_delivery ${isDeliveryModal ? 'modal_open' : ''}`}>
      <div className="modal__main modal-delivery">
        <div className="modal-delivery__container">
          <h2 className="modal-delivery__title">Доставка</h2>

          <form onSubmit={handleSubmit(submit)} className="modal-delivery__form" id="delivery">
            <fieldset className="modal-delivery__fieldset">
              <input
                className="modal-delivery__input"
                type="text"
                placeholder="Ваше имя"
                {...register('name', {
                  required: true,
                })}
                style={errors.name ? {border: '1px solid tomato'} : {}}
              />
              <input
                className="modal-delivery__input"
                type="tel"
                placeholder="Телефон"
                {...register('phone', {required: true})}
                style={errors.phone ? {border: '1px solid tomato'} : {}}
              />
            </fieldset>

            <fieldset className="modal-delivery__fieldset modal-delivery__fieldset_radio">
              <label className="modal-delivery__label">
                <input
                  className="modal-delivery__radio"
                  type="radio"
                  value="pickup"
                  {...register('delivery', {required: true})}
                />
                <span>Самовывоз</span>
              </label>
              <label className="modal-delivery__label">
                <input
                  className="modal-delivery__radio"
                  type="radio"
                  value="delivery"
                  {...register('delivery', {required: true})}
                />
                <span>Доставка</span>
              </label>
            </fieldset>

            {delivery === 'delivery' && (
              <fieldset className="modal-delivery__fieldset">
                <input
                  className="modal-delivery__input"
                  type="text"
                  placeholder="Адрес"
                  {...register('address', {
                    required: true
                  })}
                  style={errors.address ? {border: '1px solid tomato'} : {}}
                />
              </fieldset>
            )}
          </form>

          <button className="modal-delivery__submit" type="submit" form="delivery">Оформить</button>
        </div>

        <button className="modal__close" onClick={() => closeDeliveryModal(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)"/>
            <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

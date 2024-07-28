import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProduct} from "@/types/product.types";
import {WritableDraft} from "immer";

const LS_BSK_KEY = 'bsk'

interface BasketState {
  baskets: IProduct[],
  totalAmount: number,
  totalPrice: number,
}

const initialState: BasketState = {
  baskets: JSON.parse(localStorage.getItem(LS_BSK_KEY) ?? '[]'),
  totalAmount: 0,
  totalPrice: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBasket(state: WritableDraft<BasketState>, action: PayloadAction<IProduct>) {
      const isExist = state.baskets.some(product => product.id === action.payload.id)
      if (isExist) return

      let product: IProduct = {...action.payload}
      product = {...action.payload, amount: 1}
      console.log(product)

      state.baskets.push(product)
      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
    },
    increaseCountOfProduct(state, action: PayloadAction<IProduct>) {
      state.baskets.forEach((item: any) => {
        if (item.id === action.payload.id) {
          item.amount++
        }
      })

      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
    },
    decreaseCountOfProduct(state, action: PayloadAction<IProduct>) {

      state.baskets.forEach((item: any) => {
        if (item.id === action.payload.id) {
          if (item.amount === 1) {
            state.baskets = state.baskets.filter(product => product.id !== action.payload.id)
          } else {
            item.amount--
          }
        }
      })

      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
    },
    removeAllProductInBasket(state) {
      const isConfirm = confirm('Do you really want to do this?')
      if (!isConfirm) return

      state.baskets = []
      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
    },
  }
})

export const basketActions = basketSlice.actions
export const basketReducer = basketSlice.reducer
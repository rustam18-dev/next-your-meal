import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProduct} from "@/types/product.types";
import {WritableDraft} from "immer";

const LS_BSK_KEY = 'bsk'

interface BasketState {
  baskets: IProduct[]
  isShowBasket: boolean
}

const initialState: BasketState = {
  baskets: JSON.parse(localStorage.getItem(LS_BSK_KEY) ?? '[]'),
  isShowBasket: false
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBasket(state: WritableDraft<BasketState>, action: PayloadAction<IProduct>) {
      state.baskets.push(action.payload)
      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
    },
    removeBasket(state, action: PayloadAction<IProduct>) {
      state.baskets = state.baskets.filter(f => f !== action.payload)
      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
    },
    toggleBasket(state) {
      state.isShowBasket = !state.isShowBasket
    },
  }
})

export const basketActions = basketSlice.actions
export const basketReducer = basketSlice.reducer
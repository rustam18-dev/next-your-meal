import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProduct} from "@/types/product.types";
import {WritableDraft} from "immer";

const LS_BSK_KEY = 'bsk'
interface BasketState {
  baskets: IProduct[],
  previewProduct: IProduct
}

const initialState: BasketState = {
  baskets: JSON.parse(localStorage.getItem(LS_BSK_KEY) ?? '[]'),
  previewProduct: {
    id: 0,
    amount: 0,
    description: '',
    img: '',
    calories: '',
    name: '',
    price: 0,
    weight: '',
    ingredients: []
  },
}
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addBasket(state: WritableDraft<BasketState>, action: PayloadAction<IProduct>) {
      const isExist = state.baskets.some(product => product.id === action.payload.id)
      if (isExist) return

      state.baskets.push(state.previewProduct)
      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))

      state.previewProduct = initialState.previewProduct
    },
    previewProduct(state, action: PayloadAction<IProduct>) {
      state.previewProduct = {...action.payload, amount: 1}
    },
    increaseCountOfProduct(state, action: PayloadAction<IProduct>) {
      if (state.previewProduct.id === action.payload.id) {
        state.previewProduct.amount!++
      } else {
        const product = state.baskets.find(item => item.id === action.payload.id)
        if (product) {
          product.amount!++
        }
        localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
      }
    },
    decreaseCountOfProduct(state, action: PayloadAction<IProduct>) {
      if (state.previewProduct.id === action.payload.id) {
        if (state.previewProduct.amount! > 1) {
          state.previewProduct.amount!--
        }
      } else {
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
      }
    },
    removeAllProductInBasket(state) {
      const isConfirm = confirm('Do you really want to do this?')
      if (!isConfirm) return

      state.baskets = []
      localStorage.setItem(LS_BSK_KEY, JSON.stringify(state.baskets))
    },
    clearBasket(state) {
      state.baskets = []
      localStorage.removeItem(LS_BSK_KEY)
    }
  }
})

export const basketActions = basketSlice.actions
export const basketReducer = basketSlice.reducer
import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {basketReducer} from '@/store/basket/basket.slice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
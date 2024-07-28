import {useAppSelector} from "@/hooks/redux";


export function useIsExistProduct(productId: number) {
  const {baskets} = useAppSelector(state => state.basket)

  return baskets.some(item => item.id === productId)
}
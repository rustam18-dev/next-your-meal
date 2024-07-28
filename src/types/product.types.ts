export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: string;
  amount?: number;
  img: string;
  ingredients: string[]
  description?: string
  calories: string
}
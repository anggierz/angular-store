import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';

export interface BasketItem {
  product: Product;
  qty: number;
}

export interface BasketState {
  items: BasketItem[];
}

export const selectBasket = createFeatureSelector<BasketState>('basket');

export const selectBasketItems = createSelector(
  selectBasket,
  (state) => state.items
);

export const selectBasketTotal = createSelector(
  selectBasketItems,
  (items) =>
    items.reduce((total, item) => total + item.product.price * item.qty, 0)
);

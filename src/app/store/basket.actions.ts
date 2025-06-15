import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product.interface';

export const addToBasket = createAction(
  '[Basket] Add Product',
  props<{ product: Product; qty: number }>()
);

export const removeFromBasket = createAction(
  '[Basket] Remove Product',
  props<{ productId: number }>()
);

export const clearBasket = createAction('[Basket] Clear');

export const hydrateBasket = createAction(
  '[Basket] Hydrate from LocalStorage',
  props<{ items: { product: Product; qty: number }[] }>()
);

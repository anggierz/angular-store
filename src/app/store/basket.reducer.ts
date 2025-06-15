import { createReducer, on } from '@ngrx/store';
import * as BasketActions from './basket.actions';

export interface BasketItem {
  product: any;
  qty: number;
}

export interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: []
};

export const basketReducer = createReducer(
  initialState,

  on(BasketActions.addToBasket, (state, { product, qty }) => {
    const existing = state.items.find(i => i.product.id === product.id);
    const updatedItems = existing
      ? state.items.map(item =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        )
      : [...state.items, { product, qty }];

    localStorage.setItem('basket', JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }),

  on(BasketActions.removeFromBasket, (state, { productId }) => {
    const filteredItems = state.items.filter(item => item.product.id !== productId);
    localStorage.setItem('basket', JSON.stringify(filteredItems));
    return { ...state, items: filteredItems };
  }),

  on(BasketActions.clearBasket, () => {
    localStorage.removeItem('basket');
    return { items: [] };
  }),

  on(BasketActions.hydrateBasket, (state, { items }) => ({
    ...state,
    items
  }))
);

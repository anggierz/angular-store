import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { selectBasketItems, selectBasketTotal, BasketItem } from '../../store/basket.selectors';
import { removeFromBasket, clearBasket } from '../../store/basket.actions';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  items$: Observable<BasketItem[]>;
  total$: Observable<number>;

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    cp: ['', Validators.required],
    telefono: ['', Validators.required]
  });

  constructor(private store: Store, private fb: FormBuilder) {
    this.items$ = this.store.select(selectBasketItems);
    this.total$ = this.store.select(selectBasketTotal);
  }

  removeItem(productId: number) {
    this.store.dispatch(removeFromBasket({ productId }));
  }

  clear() {
    this.store.dispatch(clearBasket());
  }

  submit() {
    if (this.form.valid) {
      alert('Pedido enviado con éxito');
      this.clear();
    }
  }
}

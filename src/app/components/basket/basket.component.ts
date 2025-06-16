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
import { Router } from '@angular/router';

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
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
  });

  constructor(private store: Store, private fb: FormBuilder, private router: Router) {
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
      this.router.navigate(['/payment']);
      this.clear();
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }
}

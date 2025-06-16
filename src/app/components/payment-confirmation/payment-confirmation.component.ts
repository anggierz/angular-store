import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearBasket } from '../../store/basket.actions';

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './payment-confirmation.component.html',
  styleUrl: './payment-confirmation.component.css',
})
export class PaymentConfirmationComponent {
  constructor(private store: Store) {
    this.store.dispatch(clearBasket());
  }
}

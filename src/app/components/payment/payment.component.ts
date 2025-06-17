import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

   form = this.fb.group({
    cardNumber: ['', [Validators.required]],
    expiry: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
  });

  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  submit() {
    if (this.form.invalid) return;

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      const { cardNumber, expiry, cvc } = this.form.value;

      const validCard = cardNumber === '4999 9999 9999 9999';
      const validExpiry = /\d{2}\/\d{2}/.test(expiry!);
      const validCVC = /^\d{3}$/.test(cvc!);

      if (validCard && validExpiry && validCVC) {
        this.router.navigate(['/payment/confirmation']);
      } else {
        alert('Hay un error procesando la compra, revise los datos introducidos.');
      }
    }, 3000);
  }

}

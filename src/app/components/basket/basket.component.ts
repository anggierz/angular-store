import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  items = [
    { title: 'Producto A', price: 10, qty: 2 },
    { title: 'Producto B', price: 20, qty: 1 },
    { title: 'Producto C', price: 5, qty: 3 }
  ];

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  submit() {
    if (this.form.valid) {
      alert('Pedido enviado');
    }
  }
}
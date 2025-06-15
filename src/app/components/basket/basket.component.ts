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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      cp: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      alert('Pedido enviado');
    }
  }
}
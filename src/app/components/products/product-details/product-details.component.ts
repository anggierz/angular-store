import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { addToBasket } from '../../../store/basket.actions';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  quantity = new FormControl(1);
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private store: Store
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        this.isLoading = false;
      }
    });
  }

  addToCart() {
    if (this.product && this.quantity.value && this.quantity.value > 0) {
      this.store.dispatch(addToBasket({ product: this.product, qty: this.quantity.value }));
      alert(`Añadiste ${this.quantity.value} x ${this.product.title} al carrito`);
    }
  }
}

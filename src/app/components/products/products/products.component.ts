import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/product.interface';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatCardModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() searchTerm = '';
  products: Product[] = [];
  filtered: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = this.filtered = res;
        this.filter(this.searchTerm);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.isLoading = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      this.filter(this.searchTerm);
    }
  }

  filter(term: string) {
    this.filtered = this.products.filter(p =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}

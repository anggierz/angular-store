import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products/products.component';
import { SearchComponent } from '../products/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductsComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchTerm = '';

  onSearch(term: string) {
    this.searchTerm = term;
  }

}

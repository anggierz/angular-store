import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from '../../../services/products.service';
import { of, throwError } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Laptop',
      description: 'Alta gama',
      price: 1200,
      image: 'img1.jpg',
      category: 'tech',
      rating: {
        rate: 4.5,
        count: 10
      }
    },
    {
      id: 2,
      title: 'Tablet',
      description: 'Media gama',
      price: 600,
      image: 'img2.jpg',
      category: 'tech',
      rating: {
        rate: 4.0,
        count: 5
      }
    }
  ];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAllProducts']);
    productServiceSpy.getAllProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products when initializing', () => {
    expect(component.products.length).toBe(2);
    expect(component.filtered.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  });

  it('should filter products according searchTerm', () => {
    component.searchTerm = 'laptop';
    component.ngOnChanges({
      searchTerm: {
        previousValue: '',
        currentValue: 'laptop',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.filtered.length).toBe(1);
    expect(component.filtered[0].title).toBe('Laptop');
  });

  it('should show all products if searchTerm is empty', () => {
    component.searchTerm = '';
    component.ngOnChanges({
      searchTerm: {
        previousValue: 'x',
        currentValue: '',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.filtered.length).toBe(2);
  });

  it('should manage error when loading products', () => {
    productServiceSpy.getAllProducts.and.returnValue(throwError(() => new Error('Error')));

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.products.length).toBe(0);
    expect(component.isLoading).toBeFalse();
  });

  it('should filter correctly with not existing product', () => {
    component.searchTerm = 'noexiste';
    component.ngOnChanges({
      searchTerm: {
        previousValue: '',
        currentValue: 'noexiste',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.filtered.length).toBe(0);
  });
});

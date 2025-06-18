import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../interfaces/product.interface';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { id: 1, title: 'Producto 1', price: 10, description: '', category: '', image: '', rating: { rate: 4.5, count: 10 } },
    { id: 2, title: 'Producto 2', price: 20, description: '', category: '', image: '', rating: { rate: 3.8, count: 5 } },
  ];

  const mockProduct: Product = {
    id: 1,
    title: 'Producto 1',
    price: 10,
    description: 'Descripción',
    category: 'Categoría',
    image: 'imagen.jpg',
    rating: { rate: 4.5, count: 10 },
  };

  const apiUrl = 'https://fakestoreapi.com/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should obtain all products', () => {
    service.getAllProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should obtain a product by its id', () => {
    const productId = 1;

    service.getProductById(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
      expect(product.id).toBe(productId);
    });

    const req = httpMock.expectOne(`${apiUrl}/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Store } from '@ngrx/store';
import { Product } from '../../../interfaces/product.interface';
import { addToBasket } from '../../../store/basket.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let productServiceSpy: jasmine.SpyObj<ProductsService>;

  const mockProduct: Product = {
    id: 1,
    title: 'Producto Prueba',
    description: 'Descripción',
    price: 100,
    image: 'test.jpg',
    category: 'test',
    rating: {
      rate: 4.5,
      count: 10
    }
  };

  beforeEach(async () => {
    const activatedRouteStub = {
      snapshot: { params: { id: '1' } }
    };

    productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductById']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent, BrowserAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();

    productServiceSpy.getProductById.and.returnValue(of(mockProduct));

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product when initializing', () => {
    expect(component.product).toEqual(mockProduct);
    expect(component.isLoading).toBeFalse();
  });

  it('should manage error loading product', fakeAsync(() => {
    productServiceSpy.getProductById.and.returnValue(throwError(() => new Error('Error')));
    
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();

    expect(component.isLoading).toBeFalse();
    expect(component.product).toBeNull();
  }));

  it('should dispatch addToBasket and show alert when adding to basket', () => {
    spyOn(window, 'alert');
    component.product = mockProduct;
    component.quantity.setValue(2);

    component.addToCart();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(addToBasket({ product: mockProduct, qty: 2 }));
    expect(window.alert).toHaveBeenCalledWith('Añadiste 2 x Producto Prueba al carrito');
  });

  it('should not dispatch if there is no product', () => {
    component.product = null;
    component.quantity.setValue(1);

    component.addToCart();

    expect(storeSpy.dispatch).not.toHaveBeenCalled();
  });

  it('should not dispatch if quantity is invalid', () => {
    component.product = mockProduct;
    component.quantity.setValue(0);

    component.addToCart();

    expect(storeSpy.dispatch).not.toHaveBeenCalled();
  });
});

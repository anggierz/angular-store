import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { removeFromBasket, clearBasket } from '../../store/basket.actions';
import { selectBasketItems, selectBasketTotal } from '../../store/basket.selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;

  const initialState = {
    items: [
      {
        product: { id: 1, title: 'Producto 1', price: 10 },
        qty: 2
      }
    ],
    total: 20
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [BasketComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectBasketItems, value: initialState.items },
            { selector: selectBasketTotal, value: initialState.total }
          ]
        }),
        { provide: Router, useValue: routerSpy },
        FormBuilder
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form at the start', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should dispatch removeFromBasket when eliminating product', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.removeItem(1);
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromBasket({ productId: 1 }));
  });

  it('should dispatch clearBasket when emptying basket', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.clear();
    expect(dispatchSpy).toHaveBeenCalledWith(clearBasket());
  });

  it('should navigate to /payment if form is valid', () => {
    component.form.setValue({
      nombre: 'John',
      apellido: 'Doe',
      direccion: 'Calle 123',
      cp: '28001',
      telefono: '600112233'
    });

    component.submit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/payment']);
  });

  it('should show an alert if form is invalid', () => {
    spyOn(window, 'alert');
    component.form.setValue({
      nombre: '',
      apellido: '',
      direccion: '',
      cp: '',
      telefono: ''
    });

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Por favor, complete todos los campos del formulario.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});

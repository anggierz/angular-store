import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentConfirmationComponent } from './payment-confirmation.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { clearBasket } from '../../store/basket.actions';
import { ActivatedRoute } from '@angular/router';

describe('PaymentConfirmationComponent', () => {
  let component: PaymentConfirmationComponent;
  let fixture: ComponentFixture<PaymentConfirmationComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentConfirmationComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(PaymentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch clearBasket when initializing', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(clearBasket());
  });

  it('should show confirmation text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Pago completado');
    expect(compiled.querySelector('p')?.textContent).toContain('Gracias por su compra');
  });

  it('should have button to return Home', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Volver a la Home');
  });

  it('should show confirmation icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('mat-icon');
    expect(icon?.textContent).toContain('check_circle');
  });
});

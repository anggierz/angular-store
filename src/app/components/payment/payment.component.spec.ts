import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PaymentComponent, BrowserAnimationsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form at the start', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should set isLoading to true when sending and then to false in 3s', fakeAsync(() => {
    component.form.setValue({
      cardNumber: '4999 9999 9999 9999',
      expiry: '12/25',
      cvc: '123'
    });

    component.submit();
    expect(component.isLoading).toBeTrue();

    tick(3000);
    expect(component.isLoading).toBeFalse();
  }));

  it('should navigate if payment form is correct', fakeAsync(() => {
    component.form.setValue({
      cardNumber: '4999 9999 9999 9999',
      expiry: '12/25',
      cvc: '123'
    });

    component.submit();
    tick(3000);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/payment/confirmation']);
  }));

  it('should show alert if payment form is incorrect', fakeAsync(() => {
    spyOn(window, 'alert');

    component.form.setValue({
      cardNumber: '1234 5678 9012 3456',
      expiry: '12/25',
      cvc: '123'
    });

    component.submit();
    tick(3000);

    expect(window.alert).toHaveBeenCalledWith(
      'Hay un error procesando la compra, revise los datos introducidos.'
    );
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('should do nothing if form is invalid', () => {
    spyOn(window, 'alert');
    component.form.setValue({
      cardNumber: '',
      expiry: '',
      cvc: ''
    });

    component.submit();

    expect(component.isLoading).toBeFalse();
    expect(window.alert).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should validate form data', () => {
    component.form.setValue({
      cardNumber: '4999 9999 9999 9999',
      expiry: '12/25',
      cvc: '123'
    });

    expect(component.form.valid).toBeTrue();
  });

  it('should invalidate form with incorrect CVC', () => {
    component.form.setValue({
      cardNumber: '4999 9999 9999 9999',
      expiry: '12/25',
      cvc: '12'
    });

    expect(component.form.valid).toBeFalse();
  });

  it('should invalidate form with incorrect expiry data', () => {
    component.form.setValue({
      cardNumber: '4999 9999 9999 9999',
      expiry: '12-25', 
      cvc: '123'
    });

    expect(component.form.valid).toBeFalse();
  });

  it('should invalidate form with empty fields', () => {
    component.form.setValue({
      cardNumber: '',
      expiry: '',
      cvc: ''
    });

    expect(component.form.valid).toBeFalse();
  });
});

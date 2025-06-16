import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid at the start', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should not navigate or modify sessionStorage if form is invalid', () => {
    spyOn(sessionStorage, 'setItem');
    component.registerForm.setValue({
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    });

    component.onSubmit();

    expect(sessionStorage.setItem).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('debería guardar el usuario y navegar si el formulario es válido', () => {
    spyOn(sessionStorage, 'setItem');
    component.registerForm.setValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@test.com',
      password: '123456',
    });

    component.onSubmit();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(component.registerForm.value)
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});

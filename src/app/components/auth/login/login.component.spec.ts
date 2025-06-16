import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, 
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid at the start', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should show an alert if credentials are wrong', () => {
    spyOn(window, 'alert');
    sessionStorage.setItem('user', JSON.stringify({ email: 'test@test.com', password: '123456' }));

    component.loginForm.setValue({ email: 'wrong@test.com', password: 'badpass' });
    component.onLogin();

    expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas');
  });

  it('should navigate to home page if credentials are correct', () => {
    sessionStorage.setItem('user', JSON.stringify({ email: 'test@test.com', password: '123456' }));
    const navigateSpy = spyOn(component['router'], 'navigate');

    component.loginForm.setValue({ email: 'test@test.com', password: '123456' });
    component.onLogin();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(sessionStorage.getItem('isLoggedIn')).toBe('true');
  });
});

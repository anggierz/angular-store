import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({ template: '' })
class DummyComponent {}

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TooltipComponent,
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent },
          { path: 'login', component: DummyComponent },
          { path: 'basket', component: DummyComponent }
        ])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when clicking logo', fakeAsync(() => {
    const logoLink = fixture.debugElement.query(By.css('a[routerLink="/"]')).nativeElement;
    logoLink.click();
    tick();
    expect(location.path()).toBe('/');
  }));

  it('should navigate when clicking button of login', fakeAsync(() => {
    const loginButton = fixture.debugElement.query(By.css('.button-browser button[routerLink="/login"]')).nativeElement;
    loginButton.click();
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('should navigate when clicking button of basket', fakeAsync(() => {
    const cartButton = fixture.debugElement.query(By.css('.button-browser button[routerLink="/basket"]')).nativeElement;
    cartButton.click();
    tick();
    expect(location.path()).toBe('/basket');
  }));
});

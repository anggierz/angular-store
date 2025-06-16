import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain right address', () => {
    const direccion = fixture.debugElement.query(By.css('.footer-column:nth-child(1) p')).nativeElement;
    expect(direccion.textContent).toContain('Universidad Europea de Madrid');
  });

  it('should show author name', () => {
    const autor = fixture.debugElement.query(By.css('.footer-column:nth-child(2) strong')).nativeElement;
    expect(autor.textContent).toContain('Anggie Rizo');
  });

  it('should show contact email', () => {
    const email = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(email.getAttribute('href')).toContain('mailto:support@angularstore.com');
  });
});

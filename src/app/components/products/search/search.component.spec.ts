import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event', (done) => {
    const testValue = 'zapatillas';
    component.search.subscribe((value) => {
      expect(value).toBe(testValue);
      done();
    });

    component.control.setValue(testValue);
  });

  it('should emit empty search event if value is null', (done) => {
    component.search.subscribe((value) => {
      expect(value).toBe('');
      done();
    });

    component.control.setValue(null);
  });

  it('should render input with correct placeholder', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.placeholder).toBe('Buscar...');
  });
});

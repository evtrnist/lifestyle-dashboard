import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaloriesWidgetComponent } from './calories-widget.component';

describe('CaloriesWidgetComponent', () => {
  let component: CaloriesWidgetComponent;
  let fixture: ComponentFixture<CaloriesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloriesWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaloriesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

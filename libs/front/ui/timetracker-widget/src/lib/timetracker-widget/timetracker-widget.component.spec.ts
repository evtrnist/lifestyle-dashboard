import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimetrackerWidgetComponent } from './timetracker-widget.component';

describe('TimetrackerWidgetComponent', () => {
  let component: TimetrackerWidgetComponent;
  let fixture: ComponentFixture<TimetrackerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetrackerWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimetrackerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

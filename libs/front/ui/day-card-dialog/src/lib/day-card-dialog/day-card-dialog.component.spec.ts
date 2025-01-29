import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayCardDialogComponent } from './day-card-dialog.component';

describe('DayCardDialogComponent', () => {
  let component: DayCardDialogComponent;
  let fixture: ComponentFixture<DayCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayCardDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

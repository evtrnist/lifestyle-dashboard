import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LifeelButton } from './button.component';

@Component({
  standalone: true,
  imports: [LifeelButton],
  template: `
    <button
      lifeelbutton
      [variant]="variant"
      [size]="size"
      [loading]="loading"
      [disabled]="disabled"
    >
      {{ label }}
    </button>
  `,
})
class HostComponent {
  public variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  public size: 'sm' | 'md' | 'lg' = 'md';
  public disabled = false;
  public loading = false;
  public label = 'Save';
}

describe('LifeelButton', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  const getButton = (): HTMLButtonElement =>
    fixture.debugElement.query(By.css('button[lifeelbutton]')).nativeElement as HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('applies default host classes', () => {
    const button = getButton();

    expect(button.classList.contains('lifeel-button')).toBe(true);
    expect(button.classList.contains('lifeel-button--primary')).toBe(true);
    expect(button.classList.contains('lifeel-button--md')).toBe(true);
  });

  it('updates variant and size classes from inputs', () => {
    hostComponent.variant = 'danger';
    hostComponent.size = 'lg';
    fixture.detectChanges();

    const button = getButton();

    expect(button.classList.contains('lifeel-button--danger')).toBe(true);
    expect(button.classList.contains('lifeel-button--lg')).toBe(true);
    expect(button.classList.contains('lifeel-button--primary')).toBe(false);
    expect(button.classList.contains('lifeel-button--md')).toBe(false);
  });

  it('sets disabled state on host attributes and classes', () => {
    hostComponent.disabled = true;
    fixture.detectChanges();

    const button = getButton();

    expect(button.classList.contains('is-disabled')).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.getAttribute('disabled')).toBe('');
  });

  it('sets loading state and renders loader', () => {
    hostComponent.loading = true;
    fixture.detectChanges();

    const button = getButton();
    const loader = fixture.debugElement.query(By.css('.lifeel-button__loader'));
    const content = fixture.debugElement.query(By.css('.lifeel-button__content'));

    expect(button.classList.contains('is-loading')).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.getAttribute('disabled')).toBe('');
    expect(loader).not.toBeNull();
    expect(loader.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(content.nativeElement.textContent.trim()).toBe('Save');
  });

  it('projects button content into the content container', () => {
    hostComponent.label = 'Delete';
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('.lifeel-button__content'));

    expect(content.nativeElement.textContent.trim()).toBe('Delete');
  });
});

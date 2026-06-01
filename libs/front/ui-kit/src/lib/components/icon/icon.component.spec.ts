import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LifeelIcon } from './icon.component';
import { LifeelIconName } from './icon.registry';

@Component({
  standalone: true,
  imports: [LifeelIcon],
  template: `
    <lifeel-icon [name]="name" [color]="color" [size]="size" [strokeWidth]="strokeWidth" />
  `,
})
class HostComponent {
  public name: LifeelIconName = 'cat';
  public color = 'currentColor';
  public size = 16;
  public strokeWidth = 2;
}

describe('LifeelIcon', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  const getSvg = (): SVGElement =>
    fixture.debugElement.query(By.css('lifeel-icon svg')).nativeElement as SVGElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the selected icon', () => {
    const svg = getSvg();

    expect(svg).toBeTruthy();
    expect(
      svg.querySelectorAll('path, circle, line, polyline, polygon, rect').length,
    ).toBeGreaterThan(0);
  });

  it('applies default visual inputs', () => {
    const svg = getSvg();

    expect(svg.getAttribute('width')).toBe('16');
    expect(svg.getAttribute('height')).toBe('16');
    expect(svg.getAttribute('stroke')).toBe('currentColor');
    expect(svg.getAttribute('stroke-width')).toBe('2');
  });

  it('updates visual inputs', () => {
    hostComponent.color = '#ff5500';
    hostComponent.size = 24;
    hostComponent.strokeWidth = 3;
    fixture.detectChanges();

    const svg = getSvg();

    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('height')).toBe('24');
    expect(svg.getAttribute('stroke')).toBe('#ff5500');
    expect(svg.getAttribute('stroke-width')).toBe('3');
  });

  it('updates rendered icon when name changes', () => {
    const initialIconMarkup = getSvg().innerHTML;

    hostComponent.name = 'trash';
    fixture.detectChanges();

    expect(getSvg().innerHTML).not.toBe(initialIconMarkup);
  });
});

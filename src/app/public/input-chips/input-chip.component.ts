import { coerceElement } from '@angular/cdk/coercion';
import { Component, ElementRef, inject } from '@angular/core';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'pro-input-chip',
  template: `<ng-content></ng-content>`,
  standalone: true,
})
export class InputChipComponent extends MatChip {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  public get element(): HTMLElement {
    return coerceElement(this.elementRef);
  }
}

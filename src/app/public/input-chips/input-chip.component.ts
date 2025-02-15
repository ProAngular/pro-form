import { coerceElement } from '@angular/cdk/coercion';
import { Component, ElementRef } from '@angular/core';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'pro-input-chip',
  template: `<ng-content></ng-content>`,
  standalone: true,
})
export class InputChipComponent extends MatChip {
  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    super();
  }

  public get element(): HTMLElement {
    return coerceElement(this.elementRef);
  }
}

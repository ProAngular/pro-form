import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import {
  coerceElement,
} from '@angular/cdk/coercion';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'pro-input-dropdown-option',
  template: `<ng-content></ng-content>`,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDropdownOptionComponent extends MatOption {
  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    super();
  }

  public get element(): HTMLElement {
    return coerceElement(this.elementRef);
  }
}

import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import {
  coerceElement,
} from '@angular/cdk/coercion';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'pro-input-dropdown-option',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputDropdownOptionComponent extends MatOption {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  public get element(): HTMLElement {
    return coerceElement(this.elementRef);
  }
}

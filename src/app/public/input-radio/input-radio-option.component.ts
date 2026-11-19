import { coerceElement } from '@angular/cdk/coercion';
import { Component, ElementRef, inject, input } from '@angular/core';

@Component({
  selector: 'pro-input-radio-option[value]',
  template: `<ng-content></ng-content>`,
})
export class InputRadioOptionComponent<T> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  public readonly value = input.required<T>();

  public get element(): HTMLElement {
    return coerceElement(this.elementRef);
  }
}

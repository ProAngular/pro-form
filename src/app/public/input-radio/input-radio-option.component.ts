import { coerceElement } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'pro-input-radio-option',
  template: `<ng-content></ng-content>`,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InputRadioOptionComponent<T> {
  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @Input({ required: true }) public value!: T;

  public get element(): HTMLElement {
    return coerceElement(this.elementRef);
  }
}

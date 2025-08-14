import { coerceElement } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
} from '@angular/core';

@Component({
  selector: 'pro-input-radio-option',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
})
export class InputRadioOptionComponent<T> {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) public value!: T;

  public get element(): HTMLElement {
    return coerceElement(this.elementRef);
  }
}

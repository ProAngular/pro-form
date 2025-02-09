import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';

import { InputDirective } from '../input.directive';

import { InputRadioOptionComponent } from './input-radio-option.component';

@Component({
  selector: 'pro-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InputRadioComponent<T> extends InputDirective<T> {
  @ContentChildren(InputRadioOptionComponent)
  protected readonly options: QueryList<InputRadioOptionComponent<T>> =
    new QueryList<InputRadioOptionComponent<T>>();
}

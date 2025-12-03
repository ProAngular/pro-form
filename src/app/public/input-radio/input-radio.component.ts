import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

import { InputDirective } from '../input.directive';
import { InputRadioOptionComponent } from './input-radio-option.component';

@Component({
  selector: 'pro-input-radio[label]',
  templateUrl: './input-radio.component.html',
  imports: [MatFormFieldModule, MatRadioModule, ReactiveFormsModule],
  styleUrl: './input-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
})
export class InputRadioComponent<T> extends InputDirective<T> {
  @ContentChildren(InputRadioOptionComponent)
  protected readonly options: QueryList<InputRadioOptionComponent<T>> =
    new QueryList<InputRadioOptionComponent<T>>();
}

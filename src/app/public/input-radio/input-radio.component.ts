import { Component, contentChildren } from '@angular/core';
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
})
export class InputRadioComponent<T> extends InputDirective<T> {
  protected readonly options = contentChildren<InputRadioOptionComponent<T>>(
    InputRadioOptionComponent,
  );
}

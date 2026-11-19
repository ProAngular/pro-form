import { Component, input, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputDirective } from '../input.directive';
import { InputAppearance, InputAutocomplete } from '../types';

@Component({
  selector: 'pro-input-textarea[label]',
  templateUrl: './input-textarea.component.html',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  styleUrl: './input-textarea.component.scss',
})
export class InputTextareaComponent extends InputDirective<string> {
  public readonly appearance = input<InputAppearance>('outline');

  public readonly autocomplete = input<InputAutocomplete>('off');

  public readonly name = input<string | undefined>();

  public readonly maxLength = input<number | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });

  public readonly minLength = input<number | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });
}

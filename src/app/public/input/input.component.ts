import { Component, input, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputLoadingComponent } from '../input-loading/input-loading.component';
import { InputDirective } from '../input.directive';
import { InputAppearance, InputAutocomplete, InputType } from '../types';

@Component({
  selector: 'pro-input[label]',
  templateUrl: './input.component.html',
  imports: [
    InputLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  styleUrl: './input.component.scss',
})
export class InputComponent extends InputDirective<string> {
  public readonly appearance = input<InputAppearance>('outline');

  public readonly autocomplete = input<InputAutocomplete>('off');

  public readonly max = input<number | string | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });

  public readonly min = input<number | string | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });

  public readonly maxLength = input<number | string | undefined, unknown>(
    undefined,
    { transform: numberAttribute },
  );

  public readonly minLength = input<number | string | undefined, unknown>(
    undefined,
    { transform: numberAttribute },
  );

  public readonly name = input<string | undefined>(undefined);

  public readonly step = input<number | string | undefined, unknown>(
    undefined,
    { transform: numberAttribute },
  );

  public readonly type = input<InputType>('text');
}

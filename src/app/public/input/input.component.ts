import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';
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
    CommonModule,
    InputLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputComponent extends InputDirective<string> {
  @Input() public appearance: InputAppearance = 'outline';

  @Input() public autocomplete: InputAutocomplete = 'off';

  @Input({ transform: numberAttribute })
  public max: number | string | undefined;

  @Input({ transform: numberAttribute })
  public min: number | string | undefined;

  @Input({ transform: numberAttribute })
  public maxLength: number | string | undefined;

  @Input({ transform: numberAttribute })
  public minLength: number | string | undefined;

  @Input() public name: string | undefined;

  @Input({ transform: numberAttribute })
  public step: number | string | undefined;

  @Input() public type: InputType = 'text';
}

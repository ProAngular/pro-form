import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputTextareaComponent extends InputDirective<string> {
  @Input() public appearance: InputAppearance = 'outline';

  @Input() public autocomplete: InputAutocomplete = 'off';

  @Input() public name: string | undefined;

  @Input({ transform: numberAttribute })
  public maxLength: number | string | undefined;

  @Input({ transform: numberAttribute })
  public minLength: number | string | undefined;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputDirective } from '../input.directive';
import { InputAppearance, InputAutocomplete } from '../types';

@Component({
  selector: 'pro-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: [],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextareaComponent extends InputDirective<string> {
  @Input({ required: false }) public appearance: InputAppearance = 'outline';
  @Input({ required: false }) public autocomplete: InputAutocomplete = 'off';
  @Input({ required: false }) public name: string | undefined;

  @Input({ required: false }) public set maxLength(value: number | string) {
    const maxLengthParsed = Number(value);
    if (isNaN(maxLengthParsed)) {
      this.#maxLength = undefined;
      return;
    }
    this.#maxLength = maxLengthParsed;
  }
  public get maxLength(): number | undefined {
    return this.#maxLength;
  }
  #maxLength: number | undefined;

  @Input({ required: false }) public set minLength(value: number | string) {
    const minLengthParsed = Number(value);
    if (isNaN(minLengthParsed)) {
      this.#minLength = undefined;
      return;
    }

    this.#minLength = minLengthParsed;
  }
  public get minLength(): number | undefined {
    return this.#minLength;
  }
  #minLength: number | undefined;
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputDirective } from '../input.directive';
import { InputAppearance, InputAutocomplete, InputType } from '../types';
import { LoadingInputComponent } from '../utilities/loading-input.component';

@Component({
  selector: 'pro-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    LoadingInputComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends InputDirective<string> {
  @Input({ required: false }) public appearance: InputAppearance = 'outline';
  @Input({ required: false }) public autocomplete: InputAutocomplete = 'off';
  @Input({ required: false }) public name: string | undefined;
  @Input({ required: false }) public type: InputType = 'text';

  @Input({ required: false }) public set max(value: number | string) {
    const maxParsed = Number(value);
    if (isNaN(maxParsed)) {
      this.#max = undefined;
      return;
    }
    this.#max = maxParsed;
  }
  public get max(): number | undefined {
    if (this.type !== 'number') {
      return undefined;
    }
    return this.#max;
  }
  #max: number | undefined;

  @Input({ required: false }) public set min(value: number | string) {
    const minParsed = Number(value);
    if (isNaN(minParsed)) {
      this.#min = undefined;
      return;
    }

    this.#min = minParsed;
  }
  public get min(): number | undefined {
    if (this.type !== 'number') {
      return undefined;
    }
    return this.#min;
  }
  #min: number | undefined;

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

  @Input({ required: false }) public set step(value: number | string) {
    const stepParsed = Number(value);
    if (isNaN(stepParsed)) {
      this.#step = undefined;
      return;
    }

    this.#step = stepParsed;
  }
  public get step(): number | undefined {
    if (this.type !== 'number') {
      return undefined;
    }
    return this.#step;
  }
  #step: number | undefined;
}

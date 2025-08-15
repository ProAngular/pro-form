import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputLoadingComponent } from '../input-loading/loading-input.component';
import { InputDirective } from '../input.directive';
import { InputAppearance, InputAutocomplete, InputType } from '../types';

const rF = { required: false };

@Component({
  selector: 'pro-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    InputLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends InputDirective<string> {
  @Input(rF) public appearance: InputAppearance = 'outline';
  @Input(rF) public autocomplete: InputAutocomplete = 'off';

  @Input(rF) public set max(value: number | string) {
    this.setMax(value);
  }
  public get max(): number | undefined {
    return this.getMax();
  }
  #max: number | undefined;

  @Input(rF) public set min(value: number | string) {
    this.setMin(value);
  }
  public get min(): number | undefined {
    return this.getMin();
  }
  #min: number | undefined;

  @Input(rF) public set maxLength(value: number | string) {
    this.setMaxLength(value);
  }
  public get maxLength(): number | undefined {
    return this.#maxLength;
  }
  #maxLength: number | undefined;

  @Input(rF) public set minLength(value: number | string) {
    this.setMinLength(value);
  }
  public get minLength(): number | undefined {
    return this.#minLength;
  }
  #minLength: number | undefined;

  @Input(rF) public name: string | undefined;

  @Input(rF) public set step(value: number | string) {
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

  @Input(rF) public type: InputType = 'text';

  private getMax(): number | undefined {
    if (this.type !== 'number') {
      return undefined;
    }
    return this.#max;
  }

  private getMin(): number | undefined {
    if (this.type !== 'number') {
      return undefined;
    }
    return this.#min;
  }

  private setMax(value: number | string): void {
    const maxParsed = Number(value);
    if (isNaN(maxParsed)) {
      this.#max = undefined;
      return;
    }
    this.#max = maxParsed;
  }

  private setMaxLength(value: number | string): void {
    const maxLengthParsed = Number(value);
    if (isNaN(maxLengthParsed)) {
      this.#maxLength = undefined;
      return;
    }
    this.#maxLength = maxLengthParsed;
  }

  private setMin(value: number | string): void {
    const minParsed = Number(value);
    if (isNaN(minParsed)) {
      this.#min = undefined;
      return;
    }

    this.#min = minParsed;
  }

  private setMinLength(value: number | string): void {
    const minLengthParsed = Number(value);
    if (isNaN(minLengthParsed)) {
      this.#minLength = undefined;
      return;
    }

    this.#minLength = minLengthParsed;
  }
}

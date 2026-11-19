import { AfterViewInit, Directive, viewChildren } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { InputChipsComponent } from './input-chips/input-chips.component';
import { InputDatepickerComponent } from './input-datepicker/input-datepicker.component';
import { InputDropdownComponent } from './input-dropdown/input-dropdown.component';
import { InputRadioComponent } from './input-radio/input-radio.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputTimepickerComponent } from './input-timepicker/input-timepicker.component';
import { InputToggleComponent } from './input-toggle/input-toggle.component';
import { InputComponent } from './input/input.component';

type FormInput =
  | InputComponent
  | InputCheckboxComponent
  | InputChipsComponent
  | InputDatepickerComponent
  | InputDropdownComponent<unknown>
  | InputRadioComponent<unknown>
  | InputTextareaComponent
  | InputTimepickerComponent
  | InputToggleComponent;

@Directive()
export class FormDirective<
  T extends { [K in keyof T]: AbstractControl },
> implements AfterViewInit {
  protected readonly formGroup!: FormGroup<T>;

  private readonly inputs = viewChildren(InputComponent);

  private readonly inputCheckboxes = viewChildren(InputCheckboxComponent);

  private readonly inputChips = viewChildren(InputChipsComponent);

  private readonly inputDatepickers = viewChildren(InputDatepickerComponent);

  private readonly inputDropdowns = viewChildren(InputDropdownComponent);

  private readonly inputRadios = viewChildren(InputRadioComponent);

  private readonly inputTextareas = viewChildren(InputTextareaComponent);

  private readonly inputTimepickers = viewChildren(InputTimepickerComponent);

  private readonly inputToggles = viewChildren(InputToggleComponent);

  private get formInputs(): readonly FormInput[] {
    return [
      ...this.inputs(),
      ...this.inputCheckboxes(),
      ...this.inputChips(),
      ...this.inputDatepickers(),
      ...this.inputDropdowns(),
      ...this.inputRadios(),
      ...this.inputTextareas(),
      ...this.inputTimepickers(),
      ...this.inputToggles(),
    ];
  }

  public ngAfterViewInit(): void {
    if (!this.formGroup) {
      throw new Error('You must provide a `FormGroup` to `FormDirective`!');
    }
  }

  /** Trigger validation checks & highlight all invalid controls. */
  public highlightInvalidControls(): void {
    const inputs = this.formInputs;
    if (inputs.length === 0) {
      throw new Error('No inputs available for highlight!');
    }

    for (const input of inputs) {
      if (!input.formControl) {
        throw new Error(
          `Input "${input.label() ?? String(input)}" doesn't have a form control!`,
        );
      }
      if (input.formControl.invalid) {
        input.formControl.markAsTouched();
      }
    }
  }

  /** Reset the form to its original state. */
  protected reset(): void {
    if (this.formGroup.pristine && this.formGroup.untouched) {
      return;
    }

    this.formGroup.reset();
  }

  /**
   * Scroll to the first invalid control in the form.
   *
   * @returns The label of the first invalid control.
   */
  public scrollToFirstInvalidControl(): string | null {
    const inputs = this.formInputs;
    if (inputs.length === 0) {
      throw new Error('No form inputs provided to scroll to!');
    }

    for (const input of inputs) {
      if (!input.formControl) {
        throw new Error(
          `Input "${input.label() ?? String(input)}" doesn't have a form control!`,
        );
      }

      if (input.formControl.invalid) {
        input.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return input.label();
      }
    }

    return null;
  }
}

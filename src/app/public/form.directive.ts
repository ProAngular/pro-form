import {
  AfterViewInit,
  Directive,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { InputDatepickerComponent } from './input-datepicker/input-datepicker.component';
import { InputRadioComponent } from './input-radio/input-radio.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputTimepickerComponent } from './input-timepicker/input-timepicker.component';
import { InputToggleComponent } from './input-toggle/input-toggle.component';
import { InputComponent } from './input/input.component';
import { InputDropdownComponent } from './input-dropdown/input-dropdown.component';
import { InputChipsComponent } from './input-chips/input-chips.component';

@Directive({ selector: '[proFormDirective][formGroup]' })
export class FormDirective<T extends { [K in keyof T]: AbstractControl }>
  implements AfterViewInit
{
  protected readonly formGroup!: FormGroup<T>;

  @ViewChildren(InputComponent)
  private readonly inputs!: QueryList<InputComponent>;

  @ViewChildren(InputCheckboxComponent)
  private readonly inputCheckboxes!: QueryList<InputCheckboxComponent>;
  
  @ViewChildren(InputChipsComponent)
  private readonly inputChips!: QueryList<InputChipsComponent>;

  @ViewChildren(InputDatepickerComponent)
  private readonly inputDatepickers!: QueryList<InputDatepickerComponent>;

  @ViewChildren(InputDropdownComponent)
  private readonly inputDropdowns!: QueryList<InputDropdownComponent<T>>;

  @ViewChildren(InputRadioComponent)
  private readonly inputRadios!: QueryList<InputRadioComponent<T>>;

  @ViewChildren(InputTextareaComponent)
  private readonly inputTextareas!: QueryList<InputTextareaComponent>;

  @ViewChildren(InputTimepickerComponent)
  private readonly inputTimepickers!: QueryList<InputTimepickerComponent>;

  @ViewChildren(InputToggleComponent)
  private readonly inputToggles!: QueryList<InputToggleComponent>;

  private get formInputs(): ReadonlyArray<
    | InputComponent
    | InputCheckboxComponent
    | InputChipsComponent
    | InputDatepickerComponent
    | InputDropdownComponent<T>
    | InputRadioComponent<T>
    | InputTextareaComponent
    | InputTimepickerComponent
    | InputToggleComponent
  > {
    return [
      ...this.inputs.toArray(),
      ...this.inputCheckboxes.toArray(),
      ...this.inputChips.toArray(),
      ...this.inputDatepickers.toArray(),
      ...this.inputDropdowns.toArray(),
      ...this.inputRadios.toArray(),
      ...this.inputTextareas.toArray(),
      ...this.inputTimepickers.toArray(),
      ...this.inputToggles.toArray(),
    ];
  }

  public ngAfterViewInit(): void {
    if (!this.formGroup) {
      throw new Error('You must provide a `FormGroup` to `FormDirective`!');
    }
  }

  /** Trigger validation checks & highlight all invalid controls. */
  public highlightInvalidControls(): void {
    if (this.formInputs.length === 0) {
      throw new Error('No inputs available for highlight!');
    }

    for (const input of this.formInputs) {
      if (!input.formControl) {
        throw new Error(
          `Input "${
            input.label ?? String(input)
          }" doesn't have a form control!`,
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
    if (this.formInputs.length === 0) {
      throw new Error('No form inputs provided to scroll to!');
    }

    for (const input of this.formInputs) {
      if (!input.formControl) {
        throw new Error(
          `Input "${
            input.label ?? String(input)
          }" doesn't have a form control!`,
        );
      }

      if (input.formControl.invalid) {
        input.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return input.label;
      }
    }

    return null;
  }
}

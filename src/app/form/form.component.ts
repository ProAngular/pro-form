import { DateTime } from 'luxon';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormDirective } from '../public/form.directive';
import { InputCheckboxComponent } from '../public/input-checkbox/input-checkbox.component';
import { InputDatepickerComponent } from '../public/input-datepicker/input-datepicker.component';
import { InputDropdownOptionGroupComponent } from '../public/input-dropdown/input-dropdown-option-group.component';
import { InputDropdownOptionComponent } from '../public/input-dropdown/input-dropdown-option.component';
import { InputRadioComponent } from '../public/input-radio/input-radio.component';
import { InputTextareaComponent } from '../public/input-textarea/input-textarea.component';
import { InputTimepickerComponent } from '../public/input-timepicker/input-timepicker.component';
import { InputToggleComponent } from '../public/input-toggle/input-toggle.component';
import { InputComponent } from '../public/input/input.component';
import {
  InputChipComponent,
  InputChipsComponent,
  InputDropdownComponent,
  InputRadioOptionComponent,
} from '../public/public';
import { Option } from '../public/types';
import {
  FormGroupExample,
  formGroupExample,
  formGroupExampleValidation,
} from './form-group-example';

@Component({
  selector: 'pro-form',
  templateUrl: './form.component.html',
  imports: [
    CommonModule,
    InputCheckboxComponent,
    InputChipComponent,
    InputChipsComponent,
    InputComponent,
    InputDatepickerComponent,
    InputDropdownComponent,
    InputDropdownOptionComponent,
    InputDropdownOptionGroupComponent,
    InputRadioComponent,
    InputRadioOptionComponent,
    InputTextareaComponent,
    InputTimepickerComponent,
    InputToggleComponent,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent extends FormDirective<FormGroupExample> {
  public constructor() {
    super();

    this.today = DateTime.local().startOf('day');
    this.thirtyDaysFromNow = this.today.plus({ months: 1 });

    this.toggleDisabledFormControl = new FormControl<boolean>(false);
    this.toggleHideHintsFormControl = new FormControl<boolean>(false);
  }

  private readonly snackBar = inject(MatSnackBar);

  protected override readonly formGroup = formGroupExample;

  protected readonly chips = chips;
  protected readonly dropdownOptions = dropdownOptions;
  protected readonly groupedDropdownOptions = groupedDropdownOptions;
  protected readonly radioOptions = radioOptions;
  protected readonly thirtyDaysFromNow: DateTime;
  protected readonly today: DateTime;
  protected readonly toggleDisabledFormControl: FormControl<boolean | null>;
  protected readonly toggleHideHintsFormControl: FormControl<boolean | null>;
  protected readonly validation = formGroupExampleValidation;

  protected prefillForm(): void {
    if (this.formGroup.disabled) {
      return;
    }

    this.formGroup.setValue({
      checkboxOptional: false,
      checkboxRequired: true,
      chips: [this.chips[0], this.chips[1]],
      count: 45,
      date: this.today.plus({ weeks: 1 }),
      description: 'Lorem ipsum dolor sit amet.',
      dropdown: this.dropdownOptions[0].value,
      dropdownMultiple: [
        this.dropdownOptions[0].value,
        this.dropdownOptions[1].value,
      ],
      email: 'test@test.com',
      name: 'John Doe',
      optionsRadio: this.radioOptions[0].value,
      password: 'password',
      time: this.today.set({ hour: 13 }), // 1 PM
      toggleOptional: false,
      toggleRequired: true,
    });
    this.formGroup.markAsDirty();
  }

  protected pretifyJson(value: unknown): string {
    return JSON.stringify(value, undefined, 4);
  }

  protected submit(): void {
    if (this.formGroup.invalid) {
      this.highlightInvalidControls();
      this.scrollToFirstInvalidControl();
      this.snackBar.open(
        'Form invalid! Please fix the displayed errors and try again.',
        'Dismiss',
        {
          duration: 3000,
        },
      );

      return;
    }

    this.snackBar.open('Form valid! Submitted successfully.', 'Dismiss', {
      duration: 3000,
    });
    this.formGroup.reset();
  }

  protected toggleDisabled(shouldDisable: boolean): void {
    if (shouldDisable) {
      this.formGroup.disable();
      return;
    }

    this.formGroup.enable();
  }
}

const chips: readonly string[] = [
  'Chip 1',
  'Chip 2',
  'Chip 3',
  'Chip 4',
  'Chip 5',
  'Chip 6',
  'Chip 7',
  'Chip 8',
];

const dropdownOptions: readonly Option[] = [
  { label: 'Option 1', value: 'One' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: 3 },
];

const groupedDropdownOptions: readonly Option[] = [
  { label: 'Option 4', value: 'Four' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: 6 },
];

const radioOptions: readonly Option[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: 3 },
];

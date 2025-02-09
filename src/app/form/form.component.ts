import { DateTime } from 'luxon';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormDirective } from '../public/form.directive';
import { InputCheckboxComponent } from '../public/input-checkbox/input-checkbox.component';
import { InputDatepickerComponent } from '../public/input-datepicker/input-datepicker.component';
import { InputRadioModule } from '../public/input-radio/input-radio.module';
import { InputTextareaComponent } from '../public/input-textarea/input-textarea.component';
import { InputTimepickerComponent } from '../public/input-timepicker/input-timepicker.component';
import { InputToggleComponent } from '../public/input-toggle/input-toggle.component';
import { InputComponent } from '../public/input/input.component';
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
    InputComponent,
    InputDatepickerComponent,
    InputRadioModule,
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
  public constructor(private readonly snackBar: MatSnackBar) {
    super();

    this.today = DateTime.local().startOf('day');
    this.thirtyDaysFromNow = this.today.plus({ months: 1 });
    this.toggleDisabledFormControl = new FormControl<boolean>(false);
  }

  protected override readonly formGroup = formGroupExample;
  protected readonly radioOptions = radioOptions;
  protected readonly thirtyDaysFromNow: DateTime;
  protected readonly today: DateTime;
  protected readonly toggleDisabledFormControl: FormControl<boolean | null>;
  protected readonly validation = formGroupExampleValidation;

  protected prefillForm(): void {
    this.formGroup.setValue({
      checkboxOptional: false,
      checkboxRequired: true,
      count: 45,
      date: this.today.plus({ weeks: 1 }),
      description: 'Lorem ipsum dolor sit amet.',
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

  protected submit(): void {
    if (this.formGroup.invalid) {
      this.highlightInvalidControls();
      this.scrollToFirstInvalidControl();
      this.snackBar.open('Form invalid!', 'Dismiss', {
        duration: 3000,
      });

      return;
    }

    this.snackBar.open('Form submitted!', 'Dismiss', {
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

const radioOptions: RadioOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: 3 },
];

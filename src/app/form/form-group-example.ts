import { DateTime } from 'luxon';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '../public/utilities/custom-validators';

export interface FormGroupExample {
  checkboxOptional: FormControl<boolean | null>;
  checkboxRequired: FormControl<boolean | null>;
  count: FormControl<number | null>;
  date: FormControl<DateTime | null>;
  description: FormControl<string | null>;
  email: FormControl<string | null>;
  name: FormControl<string | null>;
  optionsRadio: FormControl<RadioOption['value'] | null>;
  password: FormControl<string | null>;
  time: FormControl<DateTime | null>;
  toggleOptional: FormControl<boolean | null>;
  toggleRequired: FormControl<boolean | null>;
}

export const formGroupExampleValidation = {
  count: {
    max: 100,
    min: 0,
  },
  description: {
    maxLength: 50,
  },
  password: {
    maxLength: 20,
    minLength: 8,
  },
};

const today = DateTime.local().startOf('day');
const validation = formGroupExampleValidation;

export const formGroupExample = new FormGroup<FormGroupExample>({
  checkboxOptional: new FormControl<boolean | null>(null),
  checkboxRequired: new FormControl<boolean | null>(null, [
    Validators.required,
  ]),
  count: new FormControl<number | null>(null, [
    Validators.min(validation.count.min),
    Validators.max(validation.count.max),
  ]),
  date: new FormControl<DateTime | null>(null, [
    Validators.required,
    CustomValidators.minDateTime(today),
    CustomValidators.maxDateTime(today.plus({ months: 1 })),
  ]),
  description: new FormControl<string | null>(null, [
    Validators.required,
    Validators.maxLength(validation.description.maxLength),
  ]),
  email: new FormControl<string | null>(null, [
    Validators.email,
    Validators.required,
  ]),
  name: new FormControl<string | null>(null, [Validators.required]),
  optionsRadio: new FormControl<RadioOption['value'] | null>(null, [
    Validators.required,
  ]),
  password: new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(validation.password.minLength),
    Validators.maxLength(validation.password.maxLength),
  ]),
  time: new FormControl<DateTime | null>(null, [
    Validators.required,
    CustomValidators.minDateTime(today.set({ hour: 8 })),
    CustomValidators.maxDateTime(today.set({ hour: 20 })),
  ]),
  toggleOptional: new FormControl<boolean | null>(null),
  toggleRequired: new FormControl<boolean | null>(null, [Validators.required]),
});

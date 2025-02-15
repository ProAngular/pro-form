import { DateTime } from 'luxon';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Option } from '../public/types';
import { CustomValidators } from '../public/utilities/custom-validators';

export interface FormGroupExample {
  checkboxOptional: FormControl<boolean | null>;
  checkboxRequired: FormControl<boolean | null>;
  chips: FormControl<readonly string[] | null>;
  count: FormControl<number | null>;
  date: FormControl<DateTime | null>;
  description: FormControl<string | null>;
  dropdown: FormControl<Option['value'] | null>;
  dropdownMultiple: FormControl<ReadonlyArray<Option['value']> | null>;
  email: FormControl<string | null>;
  name: FormControl<string | null>;
  optionsRadio: FormControl<Option['value'] | null>;
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
  chips: new FormControl<readonly string[] | null>(null, [
    Validators.required,
    Validators.maxLength(3),
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
  dropdown: new FormControl<Option['value'] | null>(null, [
    Validators.required,
  ]),
  dropdownMultiple: new FormControl<ReadonlyArray<Option['value']> | null>(
    null,
    [Validators.required, Validators.maxLength(2)],
  ),
  email: new FormControl<string | null>(null, [
    Validators.email,
    Validators.required,
  ]),
  name: new FormControl<string | null>(null, [Validators.required]),
  optionsRadio: new FormControl<Option['value'] | null>(null, [
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

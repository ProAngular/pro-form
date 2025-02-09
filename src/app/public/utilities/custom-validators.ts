import { DateTime } from 'luxon';
import { isNumber } from '../utilities';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Validates that a given DateTime value does not exceed a maximum allowed DateTime.
   *
   * @param max The maximum allowed DateTime.
   * @returns A validator function that checks if the value exceeds the max DateTime.
   */
  public static maxDateTime(max: DateTime): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value instanceof DateTime && value.isValid && value > max
        ? { max: { max, actual: value } }
        : null;
    };
  }

  /**
   * Validates that a given DateTime value is not earlier than a minimum allowed DateTime.
   *
   * @param min The minimum allowed DateTime.
   * @returns A validator function that checks if the value is below the min DateTime.
   */
  public static minDateTime(min: DateTime): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value instanceof DateTime && value.isValid && value < min
        ? { min: { min, actual: value } }
        : null;
    };
  }

  /**
   * Validates that a given value is **not** a string.
   *
   * @param control The form control being validated.
   * @returns A validation error if the value is a string, otherwise null.
   */
  public static nonString(control: AbstractControl): ValidationErrors | null {
    return typeof control.value !== 'string' ? null : { nonString: true };
  }

  /**
   * Validates that a given value is a number.
   *
   * @returns A validator function that checks if the value is a number.
   */
  public static isNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return isNumber(control.value) ? null : { nonNumber: true };
    };
  }

  /**
   * Validates that a given value is a whole number (integer).
   *
   * @returns A validator function that checks if the value is a whole number.
   */
  public static wholeNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!isNumber(control.value)) {
        return null;
      }
      return Number.isInteger(control.value) ? null : { wholeNumber: true };
    };
  }
}

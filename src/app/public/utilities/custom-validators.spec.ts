import { DateTime } from 'luxon';

import { FormControl } from '@angular/forms';

import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  const noon = DateTime.local(2025, 6, 15, 12, 0);

  describe('minDateTime', () => {
    const validator = CustomValidators.minDateTime(noon);

    it('is valid for a later or equal DateTime', () => {
      expect(validator(new FormControl(noon.plus({ hours: 1 })))).toBeNull();
      expect(validator(new FormControl(noon))).toBeNull();
    });

    it('returns a min error for an earlier DateTime', () => {
      const earlier = noon.minus({ hours: 1 });
      expect(validator(new FormControl(earlier))).toEqual({
        min: { actual: earlier, min: noon },
      });
    });

    it('ignores empty, invalid and non DateTime values', () => {
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl('yesterday'))).toBeNull();
      expect(validator(new FormControl(DateTime.invalid('bad')))).toBeNull();
    });
  });

  describe('maxDateTime', () => {
    const validator = CustomValidators.maxDateTime(noon);

    it('is valid for an earlier or equal DateTime', () => {
      expect(validator(new FormControl(noon.minus({ hours: 1 })))).toBeNull();
      expect(validator(new FormControl(noon))).toBeNull();
    });

    it('returns a max error for a later DateTime', () => {
      const later = noon.plus({ hours: 1 });
      expect(validator(new FormControl(later))).toEqual({
        max: { actual: later, max: noon },
      });
    });

    it('ignores empty, invalid and non DateTime values', () => {
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl('tomorrow'))).toBeNull();
      expect(validator(new FormControl(DateTime.invalid('bad')))).toBeNull();
    });
  });

  describe('nonString', () => {
    it('rejects strings and accepts everything else', () => {
      expect(CustomValidators.nonString(new FormControl('text'))).toEqual({
        nonString: true,
      });
      expect(CustomValidators.nonString(new FormControl(5))).toBeNull();
      expect(CustomValidators.nonString(new FormControl(null))).toBeNull();
    });
  });

  describe('wholeNumber', () => {
    const validator = CustomValidators.wholeNumber();

    it('accepts integers and rejects decimals', () => {
      expect(validator(new FormControl(4))).toBeNull();
      expect(validator(new FormControl(4.5))).toEqual({ wholeNumber: true });
    });
  });

  describe('isNumber', () => {
    const validator = CustomValidators.isNumber();

    it('accepts numbers and rejects other text', () => {
      expect(validator(new FormControl(12))).toBeNull();
      expect(validator(new FormControl('abc'))).toEqual({ nonNumber: true });
    });
  });
});

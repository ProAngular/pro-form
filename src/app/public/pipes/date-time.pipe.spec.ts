import { DateTime } from 'luxon';

import { DateTimePipe } from './date-time.pipe';

describe('DateTimePipe', () => {
  const pipe = new DateTimePipe();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats with MM/dd/yyyy by default', () => {
    expect(pipe.transform(DateTime.local(2025, 1, 5))).toBe('01/05/2025');
  });

  it('formats with a given format', () => {
    const value = DateTime.local(2025, 1, 5, 13, 30);
    expect(pipe.transform(value, 'MM/dd/yyyy, hh:mm a')).toBe(
      '01/05/2025, 01:30 PM',
    );
  });

  it('returns an empty string for empty and non DateTime values', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('2025-01-05')).toBe('');
    expect(pipe.transform(new Date())).toBe('');
  });

  describe('relative-date', () => {
    it('says Today for the last 24 hours', () => {
      const value = DateTime.local(2025, 6, 15, 11, 0);
      expect(pipe.transform(value, 'relative-date')).toBe('Today');
    });

    it('says Yesterday between 24 and 48 hours ago', () => {
      const value = DateTime.local(2025, 6, 13, 18, 0);
      expect(pipe.transform(value, 'relative-date')).toBe('Yesterday');
    });

    it('uses a relative phrase up to a week ago', () => {
      const value = DateTime.local(2025, 6, 11, 12, 0);
      expect(pipe.transform(value, 'relative-date')).toBe('4 days ago');
    });

    it('falls back to the full date after a week', () => {
      const value = DateTime.local(2025, 6, 1, 12, 0);
      expect(pipe.transform(value, 'relative-date')).toBe('06/01/2025');
    });

    it('throws for an invalid DateTime', () => {
      expect(() =>
        pipe.transform(DateTime.invalid('bad'), 'relative-date'),
      ).toThrow('There was an issue converting the datetime object');
    });
  });

  describe('relative-datetime', () => {
    it('adds the time to the relative date', () => {
      const value = DateTime.local(2025, 6, 15, 11, 0);
      expect(pipe.transform(value, 'relative-datetime')).toBe(
        'Today, 11:00 AM',
      );
    });

    it('adds the time to a full date', () => {
      const value = DateTime.local(2025, 6, 1, 15, 45);
      expect(pipe.transform(value, 'relative-datetime')).toBe(
        '06/01/2025, 3:45 PM',
      );
    });
  });
});

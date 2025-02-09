/**
 * Validate that the value is an empty value.
 *
 * @param value The value to check.
 * @returns True if the value is an empty value, false otherwise.
 */
export function isEmptyValue(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Validate that the value is a non-empty value.
 *
 * @param value The value to check.
 * @returns True if the value is a non-empty value, false otherwise.
 */
export function isNonEmptyValue<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Validate that the value is a number.
 *
 * @param value The value to check.
 * @returns True if the value is a number, false otherwise.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Validate that the value is a string. This includes both primitive strings
 * and string objects.
 *
 * @param value The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

/**
 * Validate that the value is an empty string. An empty string is a string that
 * contains no characters.
 *
 * @param value The value to check.
 * @returns True if the value is an empty string, false otherwise.
 */
export function isEmptyString(value: unknown): value is '' {
  return value === '';
}

/**
 * Validate that the value is a blank string. A blank string is a string that
 * contains only whitespace characters.
 *
 * @param value
 * @returns
 */
export function isWhitespaceString(value: unknown): boolean {
  return typeof value === 'string' && value.trim() === '';
}

/**
 * Validate that the value is a string that is non-empty.
 *
 * @param value The value to check.
 * @returns True if the value is a string that is non-empty, false otherwise.
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && !isWhitespaceString(value);
}

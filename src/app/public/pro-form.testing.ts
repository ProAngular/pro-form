import { ComponentFixture } from '@angular/core/testing';

/** Run change detection, let pending work finish, then run it once more. */
export async function settle(
  fixture: ComponentFixture<unknown>,
): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

/** The host element of a fixture. */
export function root(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

/** Find an element inside the fixture or fail the spec loudly. */
export function select<T extends Element = HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string,
): T {
  const element = root(fixture).querySelector<T>(selector);
  if (!element) {
    throw new Error(`No element matches "${selector}".`);
  }
  return element;
}

/** Collapsed text of the first `mat-error`, or `null` when none is shown. */
export function errorText(fixture: ComponentFixture<unknown>): string | null {
  const element = root(fixture).querySelector('mat-error');
  if (!element) {
    return null;
  }
  return (element.textContent ?? '').replace(/\s+/g, ' ').trim();
}

/** Dispatch a native `input` event after setting the value of a field. */
export function typeInto(
  field: HTMLInputElement | HTMLTextAreaElement,
  value: string,
): void {
  field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
}

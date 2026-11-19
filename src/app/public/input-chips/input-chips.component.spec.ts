import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, root, select, settle } from '../pro-form.testing';
import { InputChipComponent } from './input-chip.component';
import { InputChipsComponent } from './input-chips.component';

@Component({
  selector: 'pro-test-host',
  imports: [InputChipComponent, InputChipsComponent, ReactiveFormsModule],
  template: `
    <pro-input-chips label="Tags" [formControl]="control">
      <pro-input-chip value="alpha">Alpha</pro-input-chip>
      <pro-input-chip value="beta">Beta</pro-input-chip>
    </pro-input-chips>
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly control = new FormControl<string | null>(null, {
    validators: [Validators.required],
  });
}

describe('InputChipsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const chips = (): HTMLElement[] =>
    Array.from(root(fixture).querySelectorAll<HTMLElement>('mat-chip-option'));

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders one chip per pro-input-chip with its text', () => {
    expect(chips().map((chip) => (chip.textContent ?? '').trim())).toEqual([
      'Alpha',
      'Beta',
    ]);
  });

  it('shows a value written to the control', async () => {
    host.control.setValue('beta');
    await settle(fixture);
    expect(
      chips().map((chip) =>
        chip.classList.contains('mdc-evolution-chip--selected'),
      ),
    ).toEqual([false, true]);
  });

  it('sends user input to the control', async () => {
    chips()[0].querySelector<HTMLElement>('.mat-mdc-chip-action')?.click();
    await settle(fixture);
    expect(host.control.value).toBe('alpha');
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(
      select(fixture, 'mat-chip-listbox').getAttribute('aria-disabled'),
    ).toBe('true');
  });

  it('shows the required error after markAsTouched', async () => {
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Tags is required.');
  });

  it('names the listbox after the label', () => {
    const listbox = select(fixture, 'mat-chip-listbox');
    expect(listbox.getAttribute('role')).toBe('listbox');
    expect(listbox.getAttribute('aria-label')).toBe('Tags');
  });
});

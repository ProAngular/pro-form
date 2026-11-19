import { DateTime } from 'luxon';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, select, settle, typeInto } from '../pro-form.testing';
import { CustomValidators } from '../utilities';
import { InputDatepickerComponent } from './input-datepicker.component';

const shortDate = (value: DateTime): string =>
  value.toLocaleString(DateTime.DATE_SHORT);

@Component({
  selector: 'pro-test-host',
  imports: [InputDatepickerComponent, ReactiveFormsModule],
  template: `
    <pro-input-datepicker
      label="Start"
      hint="Pick a day"
      [formControl]="control"
    />
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly control = new FormControl<DateTime | null>(null, {
    validators: [
      Validators.required,
      CustomValidators.minDateTime(DateTime.local(2025, 1, 1)),
      CustomValidators.maxDateTime(DateTime.local(2025, 12, 31)),
    ],
  });
}

describe('InputDatepickerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders the input, the toggle and the hint', () => {
    expect(select(fixture, 'input')).not.toBeNull();
    expect(select(fixture, 'mat-datepicker-toggle button')).not.toBeNull();
    expect(select(fixture, 'mat-hint').textContent).toContain('Pick a day');
  });

  it('shows a value written to the control', async () => {
    const date = DateTime.local(2025, 1, 15);
    host.control.setValue(date);
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').value).toBe(
      shortDate(date),
    );
  });

  it('sends user input to the control as a DateTime', async () => {
    const date = DateTime.local(2025, 2, 20);
    typeInto(select<HTMLInputElement>(fixture, 'input'), shortDate(date));
    await settle(fixture);

    const value = host.control.value;
    expect(value).toBeInstanceOf(DateTime);
    expect(value?.toISODate()).toBe('2025-02-20');
  });

  it('opens the calendar from the toggle', async () => {
    select<HTMLButtonElement>(fixture, 'mat-datepicker-toggle button').click();
    await settle(fixture);
    expect(document.querySelector('mat-calendar')).not.toBeNull();
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').disabled).toBe(true);
  });

  it('shows the required error after markAsTouched', async () => {
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Start is required.');
  });

  it('shows the min and max errors with a formatted date', async () => {
    host.control.setValue(DateTime.local(2024, 6, 1));
    host.control.markAsTouched();
    await settle(fixture);
    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Start must be at least 01/01/2025.');

    host.control.setValue(DateTime.local(2026, 6, 1));
    await settle(fixture);
    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Start cannot exceed 12/31/2025.');
  });

  it('associates the label with the input', () => {
    const input = select<HTMLInputElement>(fixture, 'input');
    const label = select<HTMLLabelElement>(fixture, 'label');
    expect(input.id).not.toBe('');
    expect(label.htmlFor).toBe(input.id);
    expect(label.textContent).toContain('Start');
  });
});

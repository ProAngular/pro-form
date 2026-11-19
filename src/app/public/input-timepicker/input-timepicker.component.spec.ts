import { DateTime } from 'luxon';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, select, settle, typeInto } from '../pro-form.testing';
import { CustomValidators } from '../utilities';
import { InputTimepickerComponent } from './input-timepicker.component';

@Component({
  selector: 'pro-test-host',
  imports: [InputTimepickerComponent, ReactiveFormsModule],
  template: `
    <pro-input-timepicker
      label="Start time"
      hint="Pick a time"
      [formControl]="control"
    />
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly control = new FormControl<DateTime | null>(null, {
    validators: [
      Validators.required,
      CustomValidators.minDateTime(DateTime.local(2025, 1, 15, 9, 0)),
      CustomValidators.maxDateTime(DateTime.local(2025, 1, 15, 17, 0)),
    ],
  });
}

describe('InputTimepickerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const touch = async (): Promise<void> => {
    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders the input, the toggle and the hint', () => {
    expect(select(fixture, 'input')).not.toBeNull();
    expect(select(fixture, 'mat-timepicker-toggle button')).not.toBeNull();
    expect(select(fixture, 'mat-hint').textContent).toContain('Pick a time');
  });

  it('shows a value written to the control', async () => {
    host.control.setValue(DateTime.local(2025, 1, 15, 10, 30));
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').value).toMatch(/10:30/);
  });

  it('sends user input to the control as a DateTime', async () => {
    typeInto(select<HTMLInputElement>(fixture, 'input'), '2:15 PM');
    await settle(fixture);

    const value = host.control.value;
    expect(value).toBeInstanceOf(DateTime);
    expect(value?.hour).toBe(14);
    expect(value?.minute).toBe(15);
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').disabled).toBe(true);
  });

  it('shows the required error after markAsTouched', async () => {
    expect(errorText(fixture)).toBeNull();

    await touch();
    expect(errorText(fixture)).toBe('Start time is required.');
  });

  it('shows the min and max errors with a formatted time', async () => {
    host.control.setValue(DateTime.local(2025, 1, 15, 8, 0));
    await touch();
    expect(errorText(fixture)).toMatch(
      /^Start time must be at least 9:00 AM \(.+\)\.$/,
    );

    host.control.setValue(DateTime.local(2025, 1, 15, 18, 0));
    await touch();
    expect(errorText(fixture)).toMatch(
      /^Start time cannot exceed 5:00 PM \(.+\)\.$/,
    );
  });

  it('associates the label with the input', () => {
    const input = select<HTMLInputElement>(fixture, 'input');
    const label = select<HTMLLabelElement>(fixture, 'label');
    expect(input.id).not.toBe('');
    expect(label.htmlFor).toBe(input.id);
    expect(label.textContent).toContain('Start time');
  });
});

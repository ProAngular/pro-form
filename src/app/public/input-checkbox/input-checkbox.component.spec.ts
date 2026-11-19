import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, select, settle } from '../pro-form.testing';
import { InputCheckboxComponent } from './input-checkbox.component';

@Component({
  selector: 'pro-test-host',
  imports: [InputCheckboxComponent, ReactiveFormsModule],
  template: `
    <pro-input-checkbox label="Accept" [formControl]="control" />
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly checkbox = viewChild.required(InputCheckboxComponent);

  public readonly control = new FormControl<boolean | null>(null, {
    validators: [Validators.required],
  });
}

describe('InputCheckboxComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders the label with a required marker', () => {
    expect(select(fixture, 'mat-checkbox').textContent).toContain('Accept*');
  });

  it('shows a value written to the control', async () => {
    host.control.setValue(true);
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').checked).toBe(true);

    host.control.setValue(false);
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').checked).toBe(false);
  });

  it('sends user input to the control and emits change', async () => {
    const emitted: boolean[] = [];
    host.checkbox().change.subscribe((value) => emitted.push(value));

    select<HTMLInputElement>(fixture, 'input').click();
    await settle(fixture);

    expect(host.control.value).toBe(true);
    expect(host.control.valid).toBe(true);
    expect(emitted).toEqual([true]);
  });

  it('resets an unchecked required checkbox to null', async () => {
    const input = select<HTMLInputElement>(fixture, 'input');
    input.click();
    await settle(fixture);
    input.click();
    await settle(fixture);

    expect(host.control.value).toBeNull();
    expect(host.control.invalid).toBe(true);
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').disabled).toBe(true);

    host.control.enable();
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').disabled).toBe(false);
  });

  it('shows the required error after markAsTouched', async () => {
    expect(host.control.invalid).toBe(true);
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Accept is required.');
  });

  it('associates the label with the checkbox', () => {
    const input = select<HTMLInputElement>(fixture, 'input');
    const label = select<HTMLLabelElement>(fixture, 'mat-checkbox label');
    expect(input.id).not.toBe('');
    expect(label.htmlFor).toBe(input.id);
    expect(label.textContent).toContain('Accept');
  });
});

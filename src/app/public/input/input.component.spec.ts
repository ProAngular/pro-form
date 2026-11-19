import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, root, select, settle, typeInto } from '../pro-form.testing';
import { InputComponent } from './input.component';

@Component({
  selector: 'pro-test-host',
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <pro-input
      label="Name"
      hint="Your full name"
      type="email"
      [formControl]="control"
    />
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly control = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}

describe('InputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders a matInput with the configured type and hint', () => {
    const input = select<HTMLInputElement>(fixture, 'input');
    expect(input.type).toBe('email');
    expect(select(fixture, 'mat-hint').textContent).toContain('Your full name');
  });

  it('shows a value written to the control', async () => {
    host.control.setValue('Cody');
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').value).toBe('Cody');
  });

  it('sends user input to the control', () => {
    typeInto(select<HTMLInputElement>(fixture, 'input'), 'Tolene');
    expect(host.control.value).toBe('Tolene');
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').disabled).toBe(true);

    host.control.enable();
    await settle(fixture);
    expect(select<HTMLInputElement>(fixture, 'input').disabled).toBe(false);
  });

  it('shows the required error only after the control is touched', async () => {
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Name is required.');
  });

  it('shows the email error for an invalid address', async () => {
    host.control.addValidators(Validators.email);
    host.control.setValue('not-an-email');
    host.control.markAsTouched();
    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Name must be a valid email address.');
  });

  it('associates the label with the input', () => {
    const input = select<HTMLInputElement>(fixture, 'input');
    const label = select<HTMLLabelElement>(fixture, 'label');
    expect(input.id).not.toBe('');
    expect(label.htmlFor).toBe(input.id);
    expect(label.textContent).toContain('Name');
  });

  it('uses the id as the name when no name is given', () => {
    const input = select<HTMLInputElement>(fixture, 'input');
    expect(input.name).toBe(input.id);
    expect(root(fixture).querySelector('pro-input')).not.toBeNull();
  });
});

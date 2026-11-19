import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, select, settle, typeInto } from '../pro-form.testing';
import { InputTextareaComponent } from './input-textarea.component';

@Component({
  selector: 'pro-test-host',
  imports: [InputTextareaComponent, ReactiveFormsModule],
  template: `
    <pro-input-textarea
      label="Message"
      hint="Say something"
      [formControl]="control"
    />
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly control = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(5)],
  });
}

describe('InputTextareaComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders a textarea and the hint', () => {
    expect(select(fixture, 'textarea')).not.toBeNull();
    expect(select(fixture, 'mat-hint').textContent).toContain('Say something');
  });

  it('shows a value written to the control', async () => {
    host.control.setValue('Hello there');
    await settle(fixture);
    expect(select<HTMLTextAreaElement>(fixture, 'textarea').value).toBe(
      'Hello there',
    );
  });

  it('sends user input to the control', () => {
    typeInto(select<HTMLTextAreaElement>(fixture, 'textarea'), 'Typed text');
    expect(host.control.value).toBe('Typed text');
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(select<HTMLTextAreaElement>(fixture, 'textarea').disabled).toBe(
      true,
    );
  });

  it('shows the required error only after the control is touched', async () => {
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Message is required.');
  });

  it('shows the minlength error', async () => {
    host.control.setValue('abc');
    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Message must be at least 5 characters.');
  });

  it('associates the label with the textarea', () => {
    const textarea = select<HTMLTextAreaElement>(fixture, 'textarea');
    const label = select<HTMLLabelElement>(fixture, 'label');
    expect(textarea.id).not.toBe('');
    expect(label.htmlFor).toBe(textarea.id);
    expect(label.textContent).toContain('Message');
  });
});

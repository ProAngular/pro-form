import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, root, select, settle } from '../pro-form.testing';
import { InputRadioOptionComponent } from './input-radio-option.component';
import { InputRadioComponent } from './input-radio.component';

@Component({
  selector: 'pro-test-host',
  imports: [
    InputRadioComponent,
    InputRadioOptionComponent,
    ReactiveFormsModule,
  ],
  template: `
    <pro-input-radio label="Plan" hint="Pick one" [formControl]="control">
      <pro-input-radio-option value="free">Free</pro-input-radio-option>
      <pro-input-radio-option value="pro">Pro</pro-input-radio-option>
    </pro-input-radio>
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly control = new FormControl<string | null>(null, {
    validators: [Validators.required],
  });
}

describe('InputRadioComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const radios = (): HTMLInputElement[] =>
    Array.from(root(fixture).querySelectorAll<HTMLInputElement>('input'));

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders one radio button per option with its text', () => {
    expect(radios()).toHaveLength(2);
    const labels = Array.from(
      root(fixture).querySelectorAll('mat-radio-button'),
    ).map((button) => (button.textContent ?? '').trim());
    expect(labels).toEqual(['Free', 'Pro']);
  });

  it('shows the label with a required marker and the hint', () => {
    expect(select(fixture, 'mat-label').textContent).toContain('Plan*');
    expect(select(fixture, 'mat-hint').textContent).toContain('Pick one');
  });

  it('shows a value written to the control', async () => {
    host.control.setValue('pro');
    await settle(fixture);
    expect(radios().map((radio) => radio.checked)).toEqual([false, true]);
  });

  it('sends user input to the control', async () => {
    radios()[0].click();
    await settle(fixture);
    expect(host.control.value).toBe('free');

    radios()[1].click();
    await settle(fixture);
    expect(host.control.value).toBe('pro');
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(radios().every((radio) => radio.disabled)).toBe(true);

    host.control.enable();
    await settle(fixture);
    expect(radios().some((radio) => radio.disabled)).toBe(false);
  });

  it('shows the required error after markAsTouched', async () => {
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Plan is required.');
  });

  it('names the radio group after the label and links each radio to its text', () => {
    const group = select(fixture, 'mat-radio-group');
    expect(group.getAttribute('role')).toBe('radiogroup');
    expect(group.getAttribute('aria-label')).toBe('Plan radio group');

    for (const radio of radios()) {
      const label = root(fixture).querySelector<HTMLLabelElement>(
        `label[for="${radio.id}"]`,
      );
      expect(label).not.toBeNull();
    }
  });
});

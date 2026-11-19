import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, select, settle } from '../pro-form.testing';
import { InputToggleComponent } from './input-toggle.component';

@Component({
  selector: 'pro-test-host',
  imports: [InputToggleComponent, ReactiveFormsModule],
  template: `
    <pro-input-toggle label="Notify me" [formControl]="control" />
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly toggle = viewChild.required(InputToggleComponent);

  public readonly control = new FormControl<boolean | null>(null, {
    validators: [Validators.required],
  });
}

describe('InputToggleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders the label with a required marker', () => {
    expect(select(fixture, 'mat-slide-toggle').textContent).toContain(
      'Notify me*',
    );
  });

  it('shows a value written to the control', async () => {
    host.control.setValue(true);
    await settle(fixture);
    expect(
      select<HTMLButtonElement>(fixture, 'button[role="switch"]').getAttribute(
        'aria-checked',
      ),
    ).toBe('true');

    host.control.setValue(false);
    await settle(fixture);
    expect(
      select<HTMLButtonElement>(fixture, 'button[role="switch"]').getAttribute(
        'aria-checked',
      ),
    ).toBe('false');
  });

  it('sends user input to the control and emits change', async () => {
    const emitted: boolean[] = [];
    host.toggle().change.subscribe((value) => emitted.push(value));

    select<HTMLButtonElement>(fixture, 'button[role="switch"]').click();
    await settle(fixture);

    expect(host.control.value).toBe(true);
    expect(host.control.valid).toBe(true);
    expect(emitted).toEqual([true]);
  });

  it('resets an untoggled required switch to null', async () => {
    const toggle = select<HTMLButtonElement>(fixture, 'button[role="switch"]');
    toggle.click();
    await settle(fixture);
    toggle.click();
    await settle(fixture);

    expect(host.control.value).toBeNull();
    expect(host.control.invalid).toBe(true);
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(
      select<HTMLButtonElement>(fixture, 'button[role="switch"]').disabled,
    ).toBe(true);

    host.control.enable();
    await settle(fixture);
    expect(
      select<HTMLButtonElement>(fixture, 'button[role="switch"]').disabled,
    ).toBe(false);
  });

  it('shows the required error after markAsTouched', async () => {
    expect(host.control.invalid).toBe(true);
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Notify me is required.');
  });

  it('associates the label with the switch', () => {
    const toggle = select<HTMLButtonElement>(fixture, 'button[role="switch"]');
    const label = select<HTMLLabelElement>(fixture, 'mat-slide-toggle label');
    expect(toggle.id).not.toBe('');
    expect(label.htmlFor).toBe(toggle.id);
    expect(toggle.getAttribute('aria-labelledby')).toBe(label.id);
  });
});

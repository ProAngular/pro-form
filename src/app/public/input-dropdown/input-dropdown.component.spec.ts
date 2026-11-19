import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { errorText, select, settle } from '../pro-form.testing';
import { InputDropdownOptionGroupComponent } from './input-dropdown-option-group.component';
import { InputDropdownOptionComponent } from './input-dropdown-option.component';
import { InputDropdownComponent } from './input-dropdown.component';

@Component({
  selector: 'pro-test-host',
  imports: [
    InputDropdownComponent,
    InputDropdownOptionComponent,
    InputDropdownOptionGroupComponent,
    ReactiveFormsModule,
  ],
  template: `
    <pro-input-dropdown
      label="Fruit"
      hint="Pick a fruit"
      [formControl]="control"
    >
      <pro-input-dropdown-option value="apple">Apple</pro-input-dropdown-option>
      <pro-input-dropdown-option value="pear" [disabled]="true"
        >Pear</pro-input-dropdown-option
      >
      <pro-input-dropdown-option-group label="Citrus">
        <pro-input-dropdown-option value="lemon"
          >Lemon</pro-input-dropdown-option
        >
      </pro-input-dropdown-option-group>
    </pro-input-dropdown>
    <button type="button" (click)="control.markAsTouched()">Touch</button>
  `,
})
class TestHostComponent {
  public readonly control = new FormControl<string | null>(null, {
    validators: [Validators.required],
  });
}

@Component({
  selector: 'pro-test-multiple-host',
  imports: [
    InputDropdownComponent,
    InputDropdownOptionComponent,
    ReactiveFormsModule,
  ],
  template: `
    <pro-input-dropdown label="Fruits" multiple [formControl]="control">
      <pro-input-dropdown-option value="apple">Apple</pro-input-dropdown-option>
      <pro-input-dropdown-option value="lemon">Lemon</pro-input-dropdown-option>
    </pro-input-dropdown>
  `,
})
class MultipleHostComponent {
  public readonly control = new FormControl<string[]>([], {
    nonNullable: true,
  });
}

function overlayOptions(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('mat-option'));
}

function optionByText(text: string): HTMLElement {
  const option = overlayOptions().find(
    (element) => (element.textContent ?? '').trim() === text,
  );
  if (!option) {
    throw new Error(`No option with the text "${text}".`);
  }
  return option;
}

describe('InputDropdownComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  it('renders the select and the hint', () => {
    expect(select(fixture, 'mat-select')).not.toBeNull();
    expect(select(fixture, 'mat-hint').textContent).toContain('Pick a fruit');
  });

  it('shows a value written to the control', async () => {
    host.control.setValue('lemon');
    await settle(fixture);
    expect(select(fixture, '.mat-mdc-select-value').textContent).toContain(
      'Lemon',
    );
  });

  it('lists options and option groups when opened', async () => {
    select<HTMLElement>(fixture, '.mat-mdc-select-trigger').click();
    await settle(fixture);

    expect(
      overlayOptions().map((option) => (option.textContent ?? '').trim()),
    ).toEqual(['Apple', 'Pear', 'Lemon']);
    expect(document.querySelector('mat-optgroup')?.textContent ?? '').toContain(
      'Citrus',
    );
    expect(optionByText('Pear').getAttribute('aria-disabled')).toBe('true');
  });

  it('sends the chosen option to the control', async () => {
    select<HTMLElement>(fixture, '.mat-mdc-select-trigger').click();
    await settle(fixture);
    optionByText('Lemon').click();
    await settle(fixture);

    expect(host.control.value).toBe('lemon');
  });

  it('applies the disabled state', async () => {
    host.control.disable();
    await settle(fixture);
    expect(select(fixture, 'mat-select').getAttribute('aria-disabled')).toBe(
      'true',
    );

    host.control.enable();
    await settle(fixture);
    expect(select(fixture, 'mat-select').getAttribute('aria-disabled')).toBe(
      'false',
    );
  });

  it('shows the required error after markAsTouched', async () => {
    expect(errorText(fixture)).toBeNull();

    select<HTMLButtonElement>(fixture, ':scope > button').click();
    await settle(fixture);
    expect(errorText(fixture)).toBe('Fruit is required.');
  });

  it('labels the select with the floating label', () => {
    const label = select<HTMLLabelElement>(fixture, 'label');
    const labelledBy = select(fixture, 'mat-select').getAttribute(
      'aria-labelledby',
    );
    expect(label.textContent).toContain('Fruit');
    expect(label.id).not.toBe('');
    expect(labelledBy).toContain(label.id);
  });
});

describe('InputDropdownComponent with multiple selection', () => {
  it('shows every selected option', async () => {
    TestBed.configureTestingModule({ imports: [MultipleHostComponent] });
    const fixture = TestBed.createComponent(MultipleHostComponent);
    await settle(fixture);

    fixture.componentInstance.control.setValue(['apple', 'lemon']);
    await settle(fixture);

    const text = select(fixture, '.mat-mdc-select-value').textContent ?? '';
    expect(text).toContain('Apple');
    expect(text).toContain('Lemon');
  });
});

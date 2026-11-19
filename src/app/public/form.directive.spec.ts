import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormDirective } from './form.directive';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { InputComponent } from './input/input.component';
import { root, select, settle } from './pro-form.testing';

interface Controls {
  accept: FormControl<boolean | null>;
  name: FormControl<string>;
}

@Component({
  selector: 'pro-test-host',
  imports: [InputCheckboxComponent, InputComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup">
      <pro-input label="Name" formControlName="name" />
      <pro-input-checkbox label="Accept" formControlName="accept" />
    </form>
  `,
})
class TestHostComponent extends FormDirective<Controls> {
  protected override readonly formGroup = new FormGroup<Controls>({
    accept: new FormControl<boolean | null>(true),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public readonly controls = this.formGroup.controls;

  public resetForm(): void {
    this.reset();
  }

  public resetGroup(): void {
    this.formGroup.reset();
  }

  public get group(): FormGroup<Controls> {
    return this.formGroup;
  }
}

@Component({
  selector: 'pro-test-empty-host',
  template: ``,
})
class EmptyHostComponent extends FormDirective<Controls> {
  protected override readonly formGroup = new FormGroup<Controls>({
    accept: new FormControl<boolean | null>(null),
    name: new FormControl<string>('', { nonNullable: true }),
  });
}

describe('FormDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let scrollIntoView: ReturnType<typeof vi.fn>;
  let original: PropertyDescriptor | undefined;

  beforeEach(async () => {
    original = Object.getOwnPropertyDescriptor(
      Element.prototype,
      'scrollIntoView',
    );
    scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
      writable: true,
    });

    TestBed.configureTestingModule({
      imports: [TestHostComponent, EmptyHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await settle(fixture);
  });

  afterEach(() => {
    if (original) {
      Object.defineProperty(Element.prototype, 'scrollIntoView', original);
    } else {
      Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
    }
  });

  it('throws after view init when no form group is provided', () => {
    const directive = TestBed.runInInjectionContext(
      () => new FormDirective<Controls>(),
    );
    expect(() => directive.ngAfterViewInit()).toThrow(
      'You must provide a `FormGroup` to `FormDirective`!',
    );
  });

  describe('reset', () => {
    it('leaves a pristine, untouched form alone', () => {
      const reset = vi.spyOn(host.group, 'reset');
      host.resetForm();
      expect(reset).not.toHaveBeenCalled();
    });

    it('resets a form the user has changed', async () => {
      host.controls.name.setValue('Cody');
      host.controls.name.markAsDirty();
      host.controls.name.markAsTouched();
      await settle(fixture);

      host.resetForm();
      await settle(fixture);

      expect(host.controls.name.value).toBe('');
      expect(host.group.pristine).toBe(true);
      expect(host.group.untouched).toBe(true);
      expect(select<HTMLInputElement>(fixture, 'input').value).toBe('');
    });
  });

  describe('highlightInvalidControls', () => {
    it('marks only the invalid controls as touched', () => {
      host.highlightInvalidControls();
      expect(host.controls.name.touched).toBe(true);
      expect(host.controls.accept.touched).toBe(false);
    });

    it('throws when the view has no inputs', async () => {
      const empty = TestBed.createComponent(EmptyHostComponent);
      await settle(empty);
      expect(() => empty.componentInstance.highlightInvalidControls()).toThrow(
        'No inputs available for highlight!',
      );
    });
  });

  describe('scrollToFirstInvalidControl', () => {
    it('scrolls to the first invalid control and returns its label', () => {
      const label = host.scrollToFirstInvalidControl();

      expect(label).toBe('Name');
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'center',
      });
      expect(scrollIntoView.mock.contexts[0]).toBe(
        root(fixture).querySelector('pro-input'),
      );
    });

    it('returns null and does not scroll when every control is valid', () => {
      host.controls.name.setValue('Cody');
      expect(host.scrollToFirstInvalidControl()).toBeNull();
      expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('throws when the view has no inputs', async () => {
      const empty = TestBed.createComponent(EmptyHostComponent);
      await settle(empty);
      expect(() =>
        empty.componentInstance.scrollToFirstInvalidControl(),
      ).toThrow('No form inputs provided to scroll to!');
    });
  });
});

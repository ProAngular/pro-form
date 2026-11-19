import {
  ChangeDetectorRef,
  Directive,
  DoCheck,
  ElementRef,
  booleanAttribute,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';

let id = 0;

@Directive({
  host: {
    '[class.hide-hint]': 'hideHint()',
  },
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
    },
  ],
})
export abstract class InputDirective<T>
  implements ControlValueAccessor, DoCheck
{
  public constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private lastStatus: string | null = null;

  private lastTouched: boolean | null = null;

  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public readonly ngControl = inject(NgControl, { self: true, optional: true });

  public readonly hideHint = input(false, { transform: booleanAttribute });

  public readonly hint = input<string | number | null>(null);

  public readonly id = input(`pro-input-${++id}`);

  public readonly placeholder = input<string | null>(null);

  public readonly label = input.required<string>();

  public get formControl(): FormControl<T> {
    if (!this.ngControl) {
      throw new Error('Input requires a NgControl to be provided.');
    }

    return this.ngControl.control as FormControl<T>;
  }

  public get isRequired(): boolean {
    return this.formControl.hasValidator(Validators.required);
  }

  public onChange: (value: T) => void = () => undefined;

  public onTouched: () => void = () => undefined;

  public writeValue: (value: T) => void = () => undefined;

  /**
   * Touched and status changes made from outside the template (for example
   * `markAsTouched()` from a parent) don't notify signals, so mark the view for
   * check when either one changes.
   */
  public ngDoCheck(): void {
    const control = this.ngControl?.control;
    if (!control) {
      return;
    }

    if (
      control.touched !== this.lastTouched ||
      control.status !== this.lastStatus
    ) {
      this.lastTouched = control.touched;
      this.lastStatus = control.status;
      this.changeDetectorRef.markForCheck();
    }
  }

  public registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public scrollIntoView(options: ScrollIntoViewOptions | undefined): void {
    const defaultOptions: ScrollIntoViewOptions = { behavior: 'smooth' };
    this.elementRef.nativeElement.scrollIntoView({
      ...defaultOptions,
      ...options,
    });
  }
}

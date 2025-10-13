import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  booleanAttribute,
  forwardRef,
  inject,
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
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
    },
  ],
})
export abstract class InputDirective<T> implements ControlValueAccessor {
  public constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public elementRef = inject(ElementRef);

  public ngControl = inject(NgControl, { self: true, optional: true });

  public get formControl(): FormControl<T> {
    if (!this.ngControl) {
      throw new Error('Input requires a NgControl to be provided.');
    }

    return this.ngControl.control as FormControl<T>;
  }

  @HostBinding('class.hide-hint')
  @Input({ transform: booleanAttribute })
  public hideHint = false;

  @Input() public hint: string | number | null = null;

  @Input() public id = `pro-input-${++id}`;

  @Input() public placeholder: string | null = null;

  @Input({ required: true }) public label!: string;

  public get isRequired(): boolean {
    return this.formControl.hasValidator(Validators.required);
  }

  public onChange: (value: T) => void = () => undefined;

  public onTouched: () => void = () => undefined;

  public writeValue: (value: T) => void = () => undefined;

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

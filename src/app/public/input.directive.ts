import {
  Directive,
  ElementRef,
  Input,
  Optional,
  Self,
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
  selector: '[proInputDirective][formControl][label]',
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDirective),
    },
  ],
})
export abstract class InputDirective<T> implements ControlValueAccessor {
  public constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  public get formControl(): FormControl<T> {
    return this.ngControl.control as FormControl<T>;
  }

  @Input({ required: false }) public hint: string | number | null = null;
  @Input({ required: false }) public id = `pro-input-${++id}`;
  @Input({ required: false }) public placeholder: string | null = null;
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

  public scrollIntoView(options?: ScrollIntoViewOptions): void {
    const defaultOptions: ScrollIntoViewOptions = { behavior: 'smooth' };
    this.elementRef.nativeElement.scrollIntoView({
      ...defaultOptions,
      ...options,
    });
  }
}

import {
  Component,
  booleanAttribute,
  contentChildren,
  input,
  numberAttribute,
  viewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatOption,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';

import { InputLoadingComponent } from '../input-loading/input-loading.component';
import { InputDirective } from '../input.directive';
import { InputAppearance } from '../types';
import { InputDropdownOptionGroupComponent } from './input-dropdown-option-group.component';
import { InputDropdownOptionComponent } from './input-dropdown-option.component';

@Component({
  selector: 'pro-input-dropdown[label]',
  templateUrl: './input-dropdown.component.html',
  imports: [
    FormsModule,
    InputLoadingComponent,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  styleUrl: './input-dropdown.component.scss',
})
export class InputDropdownComponent<T> extends InputDirective<T> {
  public readonly appearance = input<InputAppearance>('outline');

  public readonly max = input<number | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });

  public readonly multiple = input(false, { transform: booleanAttribute });

  public readonly options = contentChildren(InputDropdownOptionComponent);

  public readonly optionGroups = contentChildren(
    InputDropdownOptionGroupComponent,
  );

  public readonly matSelect = viewChild(MatSelect);

  public readonly compareWith = input<MatSelect['compareWith']>(
    (optionValue, selectedValue) => {
      return (
        JSON.stringify(optionValue) === JSON.stringify(selectedValue) ||
        optionValue === selectedValue
      );
    },
  );

  protected get selectedOptions(): readonly InputDropdownOptionComponent[] {
    const matSelect = this.matSelect();
    if (!matSelect) {
      return [];
    }

    const allOptions = [
      ...this.options(),
      ...this.optionGroups().reduce<InputDropdownOptionComponent[]>(
        (groupOptions, group) => [...groupOptions, ...group.options()],
        [],
      ),
    ];

    // Single selection
    if (matSelect.selected instanceof MatOption) {
      const selectedValue = matSelect.selected.value;
      return allOptions.filter((option) => option.value === selectedValue);
    }

    // Multi-selection
    if (
      Array.isArray(matSelect.selected) &&
      matSelect.selected.every((s) => s instanceof MatOption)
    ) {
      const selectedValues = matSelect.selected.map(
        (selected) => (selected as MatOption).value,
      );
      return allOptions.filter((option) =>
        selectedValues.includes(option.value),
      );
    }

    // Default: No option is selected.
    return [];
  }
}

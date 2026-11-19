import { Component, contentChildren, input } from '@angular/core';

import { InputDropdownOptionComponent } from './input-dropdown-option.component';

@Component({
  selector: 'pro-input-dropdown-option-group[label]',
  template: `<ng-content></ng-content>`,
})
export class InputDropdownOptionGroupComponent {
  public readonly label = input.required<string>();

  public readonly options = contentChildren(InputDropdownOptionComponent);
}

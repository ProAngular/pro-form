import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InputDropdownComponent } from './input-dropdown.component';
import { InputDropdownOptionComponent } from './input-dropdown-option.component';
import { InputDropdownOptionGroupComponent } from './input-dropdown-option-group.component';
import { LoadingInputComponent } from '../utilities/loading-input.component';

@NgModule({
  declarations: [
    InputDropdownComponent,
    InputDropdownOptionComponent,
    InputDropdownOptionGroupComponent,
  ],
  exports: [
    InputDropdownComponent,
    InputDropdownOptionComponent,
    InputDropdownOptionGroupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoadingInputComponent,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class InputDropdownModule {}

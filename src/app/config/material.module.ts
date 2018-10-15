import { NgModule } from '@angular/core';

import {

  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormField,
  MatGridListModule,
  MatFormFieldModule,
  MatTabsModule,
  MatSidenavModule,
  MatInputModule,
  MatChipsModule,
  MatListModule,
  MatRadioModule,
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,

} from '@angular/material';

@NgModule({

  imports: [

    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,

  ], exports: [

    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
MatAutocompleteModule

  ]

})
export class MaterialModule {}
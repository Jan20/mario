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
  MatListModule

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
    MatListModule
    
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
    MatListModule

  ]

})
export class MaterialModule {}
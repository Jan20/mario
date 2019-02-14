import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from '@angular/material';

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
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,

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
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,

  ]

})
export class MaterialModule {}
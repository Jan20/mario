import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Angular Material
import { MaterialModule } from '../config/material.module'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav'

// Login
import { UserLoginComponent } from './user-login/user-login.component';

// Services
import { UserService } from './user-service/user.service';

@NgModule({
  imports: [ 
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
  ],
  declarations: [
    UserLoginComponent
  ],
  providers: [
    UserService,
  ],
  exports: [
  ]
})
export class UserModule { }

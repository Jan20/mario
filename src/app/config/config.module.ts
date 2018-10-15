import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './environment';
export const firebaseConfig = environment.firebaseConfig;
import { ROUTES } from './routing.config';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
  
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    
    // Says the Routermodule where to take all the routes
    // that exisit in the project from.
    RouterModule.forRoot(ROUTES, { enableTracing: false }),

  ],
  providers: [
  
  ],
  exports: [

    RouterModule,

  ]
})
export class ConfigModule { }

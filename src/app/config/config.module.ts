import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './environment';
import { ROUTES } from './routing.config';
export const firebaseConfig = environment.firebaseConfig;

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

  ], providers: [
  
  ], exports: [

    RouterModule,

  ]
})
export class ConfigModule { }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
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

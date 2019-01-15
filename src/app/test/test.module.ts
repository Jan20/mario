import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from './services/test.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    AngularFirestoreModule,
    HttpClientModule,
  
  ],
  providers: [

    TestService

  ]
})
export class TestModule { }

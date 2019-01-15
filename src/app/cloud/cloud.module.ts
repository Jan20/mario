import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudService } from './cloud.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
  
    CommonModule,
    HttpClientModule,

  ],
  providers: [

    CloudService

  ]
})
export class CloudModule { }

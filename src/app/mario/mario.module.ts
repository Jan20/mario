import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarioComponent } from './mario-component/mario.component'
import { MarioService } from './mario-services/mario.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

    MarioComponent

  ],
  providers: [

    MarioService

  ]
})
export class MarioModule { }

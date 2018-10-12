import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Tensor } from '@tensorflow/tfjs';

@Component({
  selector: 'app-mario',
  templateUrl: './mario.component.html',
  styleUrls: ['./mario.component.scss']
})
export class MarioComponent implements OnInit {

 
  ///////////////
  // Variables //
  ///////////////
  private title: string
  private model: Tensor = tf.tensor([1, 2, 3, 4, 
                                     1, 2, 3, 4], 
                                    [4,2], 'int32')


  //////////////////
  // Constructors //
  //////////////////
  public constructor() {

    
    const values: [number, number, number] = [1,2,3] 

    for(let i = 0; i < 30; i++) {

      values[i] = i * i

    }

    const shape: [number, number, number] = [2, 3, 5]

    this.buildTensor(values, shape)
    this.model.print()
    this.setTitle(this.model.toString())

  }

  ngOnInit() {
  }
 
  ///////////////
  // Functions //
  ///////////////
  public buildTensor(values: number[], shape: [number, number, number]) {

    this.model = tf.tensor3d(values, shape)

  }

  /////////////
  // Getters //
  /////////////
  public getTitle(): string {

    return this.title

  }

  /////////////
  // Setters //
  /////////////
  public setTitle(title: string): void {

    this.title = title

  }

}

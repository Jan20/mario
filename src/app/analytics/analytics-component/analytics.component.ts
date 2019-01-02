import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  // public linearModel: tf.Sequential
  public prediction: any

  constructor() { }

  ngOnInit() {

    this.trainModel()

  }

  private async trainModel() {

    // this.linearModel = tf.sequential()
    // this.linearModel.add(tf.layers.dense({units: 100, inputShape: [1]}))

    // this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'})

    // // Training features for the dataset
    // const xs = tf.tensor1d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    // // Label for that data => what should be predicted in the future
    // const ys = tf.tensor1d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    // await this.linearModel.fit(xs, ys)
    // console.log('model trained')

  }

  public linearPrediction(val) {

    // const output = this.linearModel.predict(tf.tensor2d([val], [1,1])) as any
    // this.prediction = Array.from(output.dataSync())[0]

  }
 


}

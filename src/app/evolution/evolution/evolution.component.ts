import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs'
import { range } from 'rxjs';
import { SessionService } from '../../analytics/analytics-services/session.service';
import { UserService } from '../../analytics/analytics-services/user.service';
import { GameplayData } from '../../analytics/analytics-models/gameplayData';
import { User } from '../../analytics/analytics-models/user';
import { resolve } from 'url';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss']
})
export class EvolutionComponent implements OnInit {
  

  constructor(

    private userService: UserService,
    private sessionService: SessionService

  ) { }

  ngOnInit() {

    console.log('-----------------------------')
    console.log('--------- Init ------------')
    console.log('-----------------------------')

    const sessions = this.retrieveGameplayData()

    console.log(sessions)
    // const k: number = 3
    // const points = this.createRandomPoints()
    // let centroids = this.createRandomCentroids(k)
    
    // const points_expanded = tf.expandDims(points, 0)
    // const centroids_expanded = tf.expandDims(centroids, 1)
    
    // const distances = tf.sum(tf.square(tf.sub(points_expanded, centroids_expanded)), 2)
    
    // // Retruns the indices of the minimum values along an axis
    // const assignments = tf.argMin(distances, 0).asType('float32')
    // // [0, 0, 1, 0, 1, 2, 0, 1, 2, 0]
    // console.log('--------------------------')
    // console.log('assignments')
    // console.log(assignments)
    // assignments.print()
    // let means = []



    // // for (let i = 0; i < k; i++) {

    // //   means.push(tf.mean(
        
    //     // tf.gather(points, tf.reshape(tf.where(tf.equal(assignments, c)),[1,-1], reduction_indices=[1]))

    // // }



    // let i = 2

    // const indices = tf.tensor2d([0, 1, 1, 0], [2,2], 'int32')
    // const input = tf.tensor2d([9, 10, 11, 12], [2, 2])
    // tf.gatherND(input, indices).print() //[10, 11]

    // const t = tf.tensor([1, 2, 3, 4, 5, 6], [6], 'int32')
    // const a = tf.tensor([1, 0, 0, 1, 0, 0], [6], 'int32')
    // t.print()
    // a.print()
    // const s = tf.equal(t,a)
    // s.print()


    // Checks whether the entries of a given tensor belong
    // to cluster i. A one will be written at every position
    // of the returning tensor where this condition is
    // fulfilled while having a zero at that position otherwise.
    // const cluster: tf.Tensor = tf.equal(assignments, i)
    // console.log('-----------------------------')
    // console.log('--------- Cluster ------------')
    // console.log('-----------------------------')
    // cluster.print()
    // const bools: tf.Tensor = tf.cast(cluster, 'int32')
    // bools.print()
    // assignments.print()
    // console.log(assignments)
    //   console.log(bools)
    // // const where: tf.Tensor = tf.where(cluster, assignments, assignments)
    // // where.print()
    // const t = tf.gatherND(assignments, bools)
    // console.log('-----------------------------')
    // console.log('--------- GATHER ------------')
    // console.log('-----------------------------')
    // t.print()

    // const condition = tf.tensor1d([1, 0, 0, 1])
    // const booleans = tf.cast(condition, 'bool')
    // console.log('booleans')
    // booleans.print()

    // const vec1 = tf.tensor([9, 10, 11, 12], [4])
    // vec1.print()
    // const vec2 = tf.tensor([1, 0, 1, 0], [4], 'int32')
    
    // console.log('-----------------------------')
    // console.log('--------- TEST ------------')
    // console.log('-----------------------------')
    
    // tf.gatherND(vec1, tf.tensor([0, 0, 0, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([0, 0, 0, 1], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([0, 0, 1, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([0, 0, 1, 1], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([0, 1, 0, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([0, 1, 0, 1], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([0, 1, 1, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([0, 1, 1, 1], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 0, 0, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 0, 0, 1], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 0, 1, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 0, 1, 1], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 1, 0, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 1, 0, 1], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 1, 1, 0], [2,2], 'int32')).print()
    // tf.gatherND(vec1, tf.tensor([1, 1, 1, 1], [2,2], 'int32')).print()
    // tf.gather(pointRené Magrittes, tf.reshape(tf.where(tf.equal(assignments, i)),[1,-1])), [1]))

    // new_centroids = tf.concat(0, means)
    // update_centroids = tf.assign(centroids, new_centroids)
    

    // assignments = tf.argmin(distances, 0)
    
  }

  private async retrieveGameplayData(): Promise<GameplayData[]> {

    let gameplayDataPoints: GameplayData[] = []

    const users: User[] = await this.userService.getUsers()

    users.forEach(async user => {

      await this.sessionService.getAllGameplayDataFromUser(user.getKey()).then(gameplayData => {

        gameplayData.forEach(gameplayData => {

          gameplayDataPoints.push(gameplayData)

        })

      })

    })

    return new Promise<GameplayData[]>(resolve => resolve(gameplayDataPoints))

  }

  /////////////////////////
  // Auxiliary functions //
  /////////////////////////
  private createRandomPoints(): tf.Tensor2D {

    let points: number[][] = []

    // Generate random points
    for (let i = 0; i < 200; i++) {

      points[i] = [Math.random() * 10 , Math.random() * 10]

    }

    return tf.tensor2d(points, [200, 2], 'float32')

  }

  private createRandomCentroids(k: number): tf.Variable {

    // Creates a two dimensional vector in

    let centroids: number[][] = []

    for (let i = 0; i < 3; i++) {

      centroids[i] = [Math.random() * 10 , Math.random() * 10]

    }

    // Creates Centroids
    return tf.variable(tf.tensor2d(centroids, [k, 2], 'float32'))

  }

  /////////////////////////////////
  // Convert and setting up data //
  /////////////////////////////////
  
  
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';

@Injectable({

  providedIn: 'root'

})
export class MarioService {

//   ///////////////
//   // Variables //
//   ///////////////
//   private color: Color
//   private colors: Color[]
//   public colorSubject: Subject<Color> = new Subject<Color>()
//   public colorsSubject: Subject<any> = new Subject<any>()

//   //////////////////
//   // Constructors //
//   //////////////////
//   constructor(
  
//     private angularFirestore: AngularFirestore,
  
//   ) {


//   }

//   ///////////////
//   // Functions //
//   ///////////////


//   /////////////////////
//   // CRUD Operations //
//   /////////////////////
//   public async fetchColor(colorId: string): Promise<void> {
  
//     this.angularFirestore.doc<Color>(`colors/${colorId}`).valueChanges().subscribe(color => this.setColor(color))
  
//   }

//   public async fetchColors(): Promise<void> {
    
//     this.angularFirestore.collection<Color>(`colors`).valueChanges().subscribe(colors => this.setColors(colors))
  
//   }

//   public async addColor(color: Color): Promise<void> {
    
//     this.angularFirestore.collection(`colors`).add(color.getColor())  
  
//   }

//   public async deleteColor(colorId: string): Promise<void> {
  
    
//     this.angularFirestore.doc(`colors/${colorId}`).delete()
  
//   }

//   public async cleanColorData(colorId: string): Promise<void> {
    
//     this.angularFirestore.collection<Color>(`colors/${colorId}/assets`).valueChanges().subscribe(assets => {

//       assets.forEach(asset => {

//         this.angularFirestore.doc(`colors/${colorId}/assets/series`).delete()

//       })
//     }) 
//   }

//   /////////////
//   // Getters //
//   /////////////
//   public getColor(): Color { 
    
//     return this.color 
  
//   }
  
//   public async getColors(): Promise<Color[]> { 
  
//     return this.colors
  
//   }
  
//   /////////////
//   // Setters //
//   /////////////
//   public setColor(color): void { 
    
//     this.color = color
//     this.colorSubject.next(color)
  
//   }
  
//   public setColors(colors: Color[]): void { 
    
//     this.colors = colors
//     this.colorsSubject.next(colors)
  
//   }
}

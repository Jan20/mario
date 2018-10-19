import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Color } from '../color-model/color';
import { ColorService } from '../color-service/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  //////////
  // HTML //
  //////////
  @ViewChild('canvas') canvas: ElementRef;

  ///////////////
  // Variables //
  ///////////////
  private currentColor: Color
  public colors: string[] = ['red', 'blue', 'green', 'orange', 'yellow', 'pink', 'purple', 'grey', 'white', 'black', 'brown']
  
  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private colorService: ColorService,

  ) { 

  }

  ngOnInit() {}

  ngAfterViewInit(): void {

    this.setup()

  }
  
  ///////////////
  // Functions //
  ///////////////
  /**
   * 
   * 
   * 
   */
  private setup() {

    this.canvas.nativeElement.width = 1510
    this.canvas.nativeElement.height = 300
    this.fillRect(this.canvas.nativeElement.getContext('2d'))

  }

  /**
   * 
   * 
   */
  private fillRect(context: CanvasRenderingContext2D) {

    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)

    context.fillStyle = `rgb(${red}, ${green}, ${blue})`
    context.fillRect(0, 0, 1510, 400)

    this.currentColor = new Color(red, green, blue, '')

  }

  /**
   * 
   * 
   * @param value 
   */
  public submit(label: string) {

    this.currentColor.setLabel(label)
    this.colorService.addColor(this.currentColor)
    this.fillRect(this.canvas.nativeElement.getContext('2d'))

  }

}

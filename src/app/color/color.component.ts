import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Tensor } from '@tensorflow/tfjs';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

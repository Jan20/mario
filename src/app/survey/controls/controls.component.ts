import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {


  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,

  ) { }

  ngOnInit() {

  }

  ///////////////
  // Functions //
  ///////////////
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    event.key === 'Enter' ? this.proceed() : null
    
  }
    

  public proceed(): void {

    this.router.navigate(['game'])

  }

  public switchToTutorial(): void {

    this.router.navigate(['tutorial'])

  }

}

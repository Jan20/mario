import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, range} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.scss']
})
export class Part2Component implements OnInit {


  ///////////////
  // Variables //
  ///////////////
  public age: string
  public gender: string

  public ageControl = new FormControl();
  public ageOptions: string[] = []
  public filteredAgeOptions: Observable<string[]>;

  public genderControl = new FormControl();
  public genderOptions: string[] = ['Male', 'Female', 'Divers', 'Prefer not to say']
  public filteredGenderOptions: Observable<string[]>;

  constructor(

    private router: Router

  ) {

    for (let i = 1; i < 101; i++) {

      this.ageOptions.push('' + i)

    }

    this.ageControl.valueChanges.subscribe(age => this.age = age)
    this.genderControl.valueChanges.subscribe(gender => this.gender = gender)
    
  }
  
  ngOnInit() {
    
    this.filteredAgeOptions = this.ageControl.valueChanges.pipe(startWith(''), map(age => this.filter(age)))
    this.filteredGenderOptions = this.genderControl.valueChanges.pipe(startWith(''), map(gender => this.filter2(gender)))
  
  }

  /**
   * 
   * 
   * 
   * @param age 
   */
  private filter(age: string): string[] {
    
    const filteredAgeOptions = age.toLowerCase()    
    
    return this.ageOptions.filter(option => option.toLowerCase().includes(filteredAgeOptions));
  
  }

  private filter2(gender: string): string[] {
    
    const filteredGenderOptions = gender.toLowerCase()    
    
    return this.genderOptions.filter(option => option.toLowerCase().includes(filteredGenderOptions));
  
  }

  public continue(): void {

    this.age != undefined && this.gender != undefined ? this.router.navigate(['survey/part_2']) : null
  
  }

}

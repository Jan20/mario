import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-part5',
  templateUrl: './part5.component.html',
  styleUrls: ['./part5.component.scss']
})
export class Part5Component implements OnInit {

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

  public isCompleted: boolean = false

  constructor(

    private router: Router,
    private surveyService: SurveyService

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



  public async continue(): Promise<void> {

    // Defines a boolean variable indicating whether all segments have been completed.
    let isCompleted: boolean = false

    // Checks whether all segments have been completed.
    isCompleted = (
      
      this.age && 
      this.gender
    
    ) ? true : false

    // Stores the given answers persistently at Firestore.
    isCompleted ? await this.surveyService.survey.storeDemographicInformation(
      
      this.age,
      this.gender
    
    ) : null

    isCompleted ? this.router.navigate(['survey/part_6']) : null
    
  }

}

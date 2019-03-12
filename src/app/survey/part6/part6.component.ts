import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SurveyService } from '../../shared/services/survey.service';

@Component({
  selector: 'app-part6',
  templateUrl: './part6.component.html',
  styleUrls: ['./part6.component.scss']
})
export class Part6Component implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public usage: string

  public usageControl = new FormControl();
  public usageOptions: string[] = []
  public filteredUsageOptions: Observable<string[]>;

  public isStored: boolean = false

  constructor(

    private router: Router,
    private surveyService: SurveyService

  ) {

    for (let i = 1; i < 101; i++) {

      this.usageOptions.push('' + i)

    }

    this.usageControl.valueChanges.subscribe(usage => this.usage = usage)
    
  }
  
  ngOnInit() {
    
    this.filteredUsageOptions = this.usageControl.valueChanges.pipe(startWith(''), map(usage => this.filter(usage)))
  
  }

  private filter(usage: string): string[] {
    
    const filteredUsageOptions = usage.toLowerCase()    
    
    return this.usageOptions.filter(option => option.toLowerCase().includes(filteredUsageOptions));
  
  }


  public async continue(): Promise<void> {

    // Defines a boolean variable indicating whether all segments have been completed.
    let isCompleted: boolean = false

    // Checks whether all segments have been completed.
    isCompleted = this.usage ? true : false

    // Stores the given answers persistently at Firestore.
    isCompleted ? await this.surveyService.survey.storeUsage(this.usage) : null
    
    isCompleted ? await this.surveyService.storeSurvey() : null

    this.isStored = true

  }
}

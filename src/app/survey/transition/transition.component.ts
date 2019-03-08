import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { interval } from "rxjs";
import { SessionService } from '../../analytics/services/session.service';
import { LevelService } from '../../mario/services/level.service';
import { Level } from 'src/app/models/level';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transition',
    templateUrl: './transition.component.html',
    styleUrls: ['./transition.component.scss']
})
export class TransitionComponent implements OnInit {

    ///////////////
    // Variables //
    ///////////////
    
    // Declares a variable indicating whether the current 
    // session has been stored at Firestore or not. 
    public isStored: boolean = false

    // 
    public readyForSurvey: boolean = false
    
    // Status variable that can either be 'ready', 'loading',
    // 'running', 'lost' or 'completed'.
    public status: string

    //////////////////
    // Constructors //
    //////////////////
    /**
     * 
     * Default constructor
     * 
     */
    public constructor(

        private sessionService: SessionService,
        private levelService: LevelService,
        private router: Router

    ) {

        this.sessionService.sessionSubject.subscribe(status => status === 'stored' ? this.isStored = true : this.isStored = false)

        this.sessionService.readyForSurveySubject.subscribe(readyForSurvey => this.readyForSurvey = readyForSurvey)
        this.sessionService.statusSubject.subscribe(status => this.status = status)
        this.sessionService.statusSubject.next('ready')
        
    }

    ngOnInit(): void {

    }

    /**
     * 
     * @param event 
     *
     */
    @HostListener('document:keydown', ['$event'])
    async handleKey(event: KeyboardEvent) {

        event.key === 'Enter' ? this.startNewLevel() : null

    }

    /**
     * 
     * Retrieves 
     * 
     */
    public async startNewLevel(): Promise<void> {

        // Checks whether the user can progress to the survey.
        if (this.readyForSurvey) {

            // 
            this.progressToSurvey()
            return

        }

        // Checks wheather
        if (this.status === 'ready') {

            this.status = 'loading'

            const level: Level = await this.levelService.getLevel()

            this.sessionService.statusSubject.next('running')
            this.isStored ? location.reload() : null

        }

        if ((this.status === 'completed' || this.status === 'lost') && this.isStored === true) {

            location.reload() 

        }
    
        // If the current session has been stored successfully,
        // a page refresh is performend. 

    }

    /**
     * 
     * Directs the user further to the first part of the survey.
     * 
     */
    public StartAnotherRound(): void {

        // Changes the current URL to the start of the survey.
        this.router.navigate(['game'])

    }

    /**
     * 
     * Directs the user further to the first part of the survey.
     * 
     */
    public progressToSurvey(): void {

      // Changes the current URL to the start of the survey.
      this.router.navigate(['survey/part_1'])

  }
}

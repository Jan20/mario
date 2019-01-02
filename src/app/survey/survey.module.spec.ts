import { SurveyModule } from './survey.module';
import { MaterialModule } from '../config/material.module'

describe('SurveyModule', () => {
  let surveyModule: SurveyModule;

  beforeEach(() => {
    surveyModule = new SurveyModule();
  });

  it('should create an instance', () => {
    expect(surveyModule).toBeTruthy();
  });
});

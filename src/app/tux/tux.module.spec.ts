import { TuxModule } from './tux.module';

describe('TuxModule', () => {
  
  let tuxModule: TuxModule;

  beforeEach(() => {
  
    tuxModule = new TuxModule();
  
  });

  it('should create an instance', () => {
  
    expect(tuxModule).toBeTruthy();
  
  });
});

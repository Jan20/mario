import { MarioModule } from './mario.module';

describe('MarioModule', () => {
  
  let marioModule: MarioModule;

  beforeEach(() => {
  
    marioModule = new MarioModule();
  
  });

  it('should create an instance', () => {
  
    expect(marioModule).toBeTruthy();
  
  });
});

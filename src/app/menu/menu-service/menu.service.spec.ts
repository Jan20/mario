import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('MenuService', () => {

  beforeEach(() => {
  
    TestBed.configureTestingModule({

      imports: [
        
        AngularFireModule.initializeApp(environment.firebaseConfig)

      ],
  
      providers: [
        
        MenuService,
        AngularFirestore
      
      ],
      
    });
  });

  it('should be created', () => {

    const service: MenuService = TestBed.get(MenuService)
    expect(service).toBeTruthy()
  
  })

});

import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/app/misc/firestore.stub';

describe('MenuService', () => {

  beforeEach(() => {
  
    TestBed.configureTestingModule({
  
      providers: [
        
        MenuService,
        { provide: AngularFirestore, useValue: FirestoreStub }
      
      ],
      
    });
  });

  it('should be created', () => {

    const service: MenuService = TestBed.get(MenuService)
    expect(service).toBeTruthy()
  
  })

});

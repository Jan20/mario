import { Component, OnInit } from '@angular/core'
import { MenuService } from '../menu-service/menu.service'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
// Services
import { UserService } from '../../user/user-service/user.service'

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////


  //////////////////
  // Constructors //
  //////////////////
  constructor(
   
  ) {}

  ngOnInit() {
   
  }

}

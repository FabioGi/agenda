import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {

  users : Observable<any[]>;

  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.users = this.auth.getUsersList();
  }

  updateField(user,value) {
     this.auth.changeRole(user,value);
  }

}

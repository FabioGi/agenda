import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-page-management",
  templateUrl: "./page-management.component.html",
  styleUrls: ["./page-management.component.scss"]
})

export class PageManagementComponent implements OnInit {
  exeFunctionOnlyOnce = true;
  
  constructor( public auth: AuthService,
               private router: Router) { 

  }

  ngOnInit() {
  }

  userControle(user){
    if (this.exeFunctionOnlyOnce) {
      console.log(user.role);
      if(user.role === undefined) {
        this.router.navigate(['/welcome']);
      } else if (user.role === 'prohibit') {
        this.router.navigate(['**']);
      } else {
        this.router.navigate(['/calendar']);
      }
      this.exeFunctionOnlyOnce = false ;
    }
  }
}

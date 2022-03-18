import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any = null;
  password: any = null;
  constructor(private db : DbService, private router : Router, private dlgRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  submit(){
    this.db.userData.forEach(ele => {
      if (ele['username'] == this.username && ele['password'] == this.password){
        ele['isLogin'] = true
        this.router.navigateByUrl('/book-ticket')
      } else {
        window.alert("Invalids")
      }
    })
    this.dlgRef.close(true)
  }

}

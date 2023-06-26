import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { patientOrHelperGuard } from '../patient-or-helper.guard';
import { RoleService } from '../Services/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogin:boolean=false;
  isHelper:boolean=false;
  isAdmin:boolean=false;

  constructor(private auth:AuthService,private toast:ToastrService,private cuesrole:patientOrHelperGuard){}//,private jwtHelper:JwtHelperService){}

  ngOnInit(): void {
    this.auth.userdata.subscribe(()=>{
      if(this.auth.userdata.getValue()!=null){
        this.isLogin=true;
      }
      else{
        this.isLogin=false;
      }
  
      if(this.cuesrole.canActivate()==1){
        this.isHelper=true;
        this.isAdmin=false;
      }
      else if(this.cuesrole.canActivate()==2){
        this.isAdmin=false;
        this.isHelper=false;
      }
      else{
        this.isHelper=false;
        this.isAdmin=true;
      }

  }) 
}
  logOut(){
    this.auth.logout();
  }
}

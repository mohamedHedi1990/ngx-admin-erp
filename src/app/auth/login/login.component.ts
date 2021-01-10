import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { JwtResponse } from '../../models/JwtResponse.model';
import { LoginRequest } from '../../models/LoginRequest.model';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class NgxLoginComponent {
  user: any = {
    password: null,
    matricule: null
  };
  loginRequest:LoginRequest;
  
  testAuth=false;
  authFailed = false;
  constructor(
    private router: Router,private serviceAuth:AuthServiceService) {

  }

login()
{
  console.log("login user ");
  console.log(this.user.matricule);
  console.log(this.user.password);
 
  this.loginRequest=new LoginRequest(this.user.matricule,this.user.password);
  this.serviceAuth.login(this.loginRequest).subscribe(
    (data:JwtResponse)=>{
      console.log("success");
      console.log(data);
      localStorage.setItem('token',data.token);
      this.authFailed = false;
      this.router.navigateByUrl("/pages/dashboard");
      this.testAuth=false;
    },
    (error)=>{
      console.log("error");
      this.testAuth=true;
      this.authFailed = true;
    }
    )
} 
}
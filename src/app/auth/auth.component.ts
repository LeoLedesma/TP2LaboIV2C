import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  constructor(private auth:AuthService,private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.getParams();
  }

  getParams(){
    this.route.queryParams.subscribe((params) => {
      const mode = params['mode'];
      const oobCode = params['oobCode'];
      const apiKey = params['apiKey'];

      console.log(mode, oobCode, apiKey);
  
      switch (mode) {       
        case 'verifyEmail':          
          this.handleVerifyEmail(oobCode);
          break;
        default:          
      }
    });
  }

  handleVerifyEmail(oobCode:string){
    this.auth.confirmarCorreo(oobCode).then((resp)=>{
      Swal.fire({
        icon: 'success',
        title: 'Verificación exitosa!',
        text: 'Redirigiendo al inicio de sesion!',
        timer: 1500
      }).then(r => {               
          this.router.navigate(['/login']);        
      })
    }).catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Verificación fallida!',
        text: 'Vuelva a intentarlo!',
        timer: 1500
      }).then(r => {               
          this.router.navigate(['/login']);        
      })
    });
  }


 
}

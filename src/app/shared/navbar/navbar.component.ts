import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  public usuario:Usuario;

  constructor(private auth:AuthService,
              private router:Router) {
    this.usuario = auth.usuario
   }

  ngOnInit(): void {
  }

  cerrarSession(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }
}

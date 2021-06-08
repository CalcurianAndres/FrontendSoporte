
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonitoreoService } from 'src/app/services/monitoreo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.css'
  ]
})
export class MainComponent implements OnInit {

  public monitores:any;
  public cargando:boolean = false;

  Ips: FormGroup = this.fb.group({
    nombre:['', Validators.required],
    direccion:['', Validators.required],
  })

  constructor(private fb:FormBuilder,
              private monitor:MonitoreoService) { }

  ngOnInit(): void {
    this.ObtenerDireccion();
  }

  NuevaDireccion(){
    this.monitor.NuevoMonitor(this.Ips.value)
    .subscribe((resp:any)=>{
      console.log(resp);
    })

    this.ObtenerDireccion();
    this.Ips.reset();
  }

  ObtenerDireccion(){
    this.monitor.obtenerMonitores()
      .subscribe((resp:any)=>{
        this.monitores = resp.monitores;
      })
    
  }

  campoNoValido(campo:string){
    return this.Ips.controls[campo].errors 
        && this.Ips.controls[campo].touched
  }

  borrarMonitor(id:string){
    this.monitor.EliminarMonitor(id)
      .subscribe((resp:any)=>{
        Swal.fire('Eliminado', 'El monitor fue elimminado', 'success');
        this.ObtenerDireccion();
      });
  }

  ping(id:string, nombre:string){

    // Agregar clase is-loading
    let boton = document.getElementsByClassName(nombre);
    for(var i = 0; i < boton.length; i++)
    boton[i].className += " is-loading";

    this.monitor.Ping(id)
      .subscribe((resp:any)=>{
        Swal.fire({
          width:600,
          text:resp
        });
        this.ObtenerDireccion();
      });
  }

  async PingTodos(){
    
    for(var x=0; x<this.monitores.length;x++){

      let boton = document.getElementsByClassName(this.monitores[x].nombre);
      for(var i = 0; i < boton.length; i++)
      boton[i].className += " is-loading";

      const ping = this.monitor.Ping(this.monitores[x]._id).toPromise()
      let resp = await Promise.all([ping]).then((res:any) =>{

        Swal.fire({
          width:600,
          text:res
        });

      })
      
      
    }
    this.ObtenerDireccion();
    this.monitor.crearReporte()
      .subscribe(
        resp =>{
          console.log(resp)
        }
      )
}


}
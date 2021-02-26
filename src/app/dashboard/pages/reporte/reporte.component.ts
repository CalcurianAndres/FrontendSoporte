import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  reporteNuevo:boolean = false;
  fechaDesde:any;
  fechaHasta:any;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  generarReporte(desde:any, hasta:any){

    this.fechaDesde = desde.value;
    this.fechaHasta = hasta.value;

    this.reporteNuevo = true;
  }

}

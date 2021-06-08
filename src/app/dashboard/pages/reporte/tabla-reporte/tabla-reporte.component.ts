import { Component, Input, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { Ticket } from 'src/app/models/ticket.model';
import { fechasReporte, Monitors } from 'src/app/dashboard/interfaces/reportes.interface';

import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { MonitoreoService } from 'src/app/services/monitoreo.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss']
})
export class TablaReporteComponent implements OnInit {

  // REALIZARLE INTERFAZ ********
  public reporte:Ticket[];
  public cargando:boolean = true;
  public seRealizoReporte:boolean = false;
  public usuario:Usuario;
  public chequeos:Monitors;
  public total:number = 0;

  hasta:string;
  desde:string;

  constructor(private reporteService:ReportesService,
              private monitoreo:MonitoreoService,
              private auth:AuthService) { 
                this.usuario = auth.usuario
              }

  ngOnInit(): void {

  }

  public openPDF():void{

    
    const PDF:PdfMakeWrapper = new PdfMakeWrapper();
    
    PDF.header(`Reporte departamento: ${this.usuario.Departamento}`);
    
    PDF.add(
      new Txt('REPORTE DEL DEPARTAMENTO DE SISTEMAS').alignment('center').end 
      )
      PDF.add(
        new Txt(`Tickets atendidos de ${this.desde} hasta ${this.hasta}`).alignment('center').italics().end 
        )
        
    PDF.add(
      new Table([
        ['#','Fecha','Usuario','Asunto','Status']
      ]).widths(['3%','14%', '25%', '33%', '25%']).end
    )
    
    for (let i = 0; i < this.reporte.length; i++) {
      
      const user = this.reporte[i].usuario;
      const Nusuario = `${user[0].Nombre} ${user[0].Apellido}`
      const fecha = new Date(this.reporte[i].fecha);
      const fechaCorta = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      
      PDF.add(
        new Table([
          [(i+1),fechaCorta, Nusuario, this.reporte[i].titulo,this.reporte[i].estado]
        ]).widths(['3%','14%', '25%', '33%', '25%']).end
      )

      this.total = i + 1;
    }

    PDF.add(
      new Txt(`
      El total de tickets atendidos en la fecha es de: ${this.total}
      
      
      `).alignment('center').bold().end 
      )

    PDF.add(
      new Txt(`Chequeos realizados`).alignment('center').italics().end 
      )
    
    PDF.add(
      new Table([
        ['Fecha', 'Resultado']
      ]).widths(['30%', '70%']).end
    )

    for(let x = 0; x < this.chequeos.Monitors.length; x++){
      const fecha = new Date(this.chequeos.Monitors[x].fecha);
      const fechaCorta = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()}`;
        
      PDF.add(
        new Table([
          [fechaCorta, this.chequeos.Monitors[x].descripcion]
        ]).widths(['30%', '70%']).end
      )
    }
    
    PDF.create().download('Reporte Departamento de Sitemas');
  }

  traerChequeos(desde:string, hasta:string){
    this.monitoreo.obtenerChequeos(desde,hasta)
      .subscribe(resp =>{
        this.chequeos = resp;
      })

  }

  generarReporte(fechas:fechasReporte){

     this.seRealizoReporte = true;
     this.cargando = true;
     console.log(fechas.desde)
     console.log(fechas.hasta)
     this.reporteService.generarReporte(fechas.desde, fechas.hasta)
       .subscribe(resp=>{
        this.reporte = resp.tickets;
        const desdeAno = fechas.desde.substring(0,4)
        const desdeMes = fechas.desde.substring(5,7)
        const desdeDia = fechas.desde.substring(8,10)
        const hastaAno = fechas.hasta.substring(0,4)
        const hastaMes = fechas.hasta.substring(5,7)
        const hastaDia = fechas.hasta.substring(8,10)
        this.desde = `${desdeDia}/${desdeMes}/${desdeAno}`;
        this.hasta = `${hastaDia}/${hastaMes}/${hastaAno}`;
        this.cargando = false;
       })

       this.traerChequeos(fechas.desde, fechas.hasta);

  }

}

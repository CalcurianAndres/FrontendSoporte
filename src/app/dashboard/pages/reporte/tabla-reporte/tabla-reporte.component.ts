import { Component, Input, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { Ticket } from 'src/app/models/ticket.model';
import { fechasReporte } from 'src/app/dashboard/interfaces/reportes.interface';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  hasta:string;
  desde:string;

  constructor(private reporteService:ReportesService) { }

  ngOnInit(): void {

  }

  public openPDF():void{
    let DATA = document.getElementById('reporteGenerado')

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
    
      PDF.save(`REPORTE - DE ${this.desde} HASTA ${this.hasta}.pdf`);

    })
  }

  generarReporte(fechas:fechasReporte){

     this.seRealizoReporte = true;
     this.cargando = true;
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

  }

}

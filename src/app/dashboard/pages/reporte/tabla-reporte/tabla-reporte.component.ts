import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss']
})
export class TablaReporteComponent implements OnInit {

  // REALIZARLE INTERFAZ ********
  public reporte:[] = [];

  constructor(private reporteService:ReportesService) { }

  ngOnInit(): void {
    this.generarReporte();
  }

  generarReporte(){

    this.reporteService.generarReporte()
      .subscribe((resp:any)=>{
        console.log(resp.tickets)
        this.reporte = resp.tickets;

      })

  }

}

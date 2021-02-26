import { Component, Input, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss']
})
export class TablaReporteComponent implements OnInit {

  // REALIZARLE INTERFAZ ********
  public reporte:[] = [];
  public cargando:boolean = true;

  @Input() hasta:any;
  @Input() since:any;

  constructor(private reporteService:ReportesService) { }

  ngOnInit(): void {
    this.generarReporte();
  }

  generarReporte(){

    this.reporteService.generarReporte(this.since, this.hasta)
      .subscribe((resp:any)=>{
        this.reporte = resp.tickets;

        const desdeAno = this.since.substring(0,4)
        const desdeMes = this.since.substring(5,7)
        const desdeDia = this.since.substring(8,10)

        const hastaAno = this.hasta.substring(0,4)
        const hastaMes = this.hasta.substring(5,7)
        const hastaDia = this.hasta.substring(8,10)

        this.since = `${desdeDia}/${desdeMes}/${desdeAno}`;
        this.hasta = `${hastaDia}/${hastaMes}/${hastaAno}`;

        this.cargando = false;
      })

  }

}

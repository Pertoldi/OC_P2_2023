import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  public chartType = 'pie'
  public chartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public chartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public chartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public chartLegend = true;
  public chartPlugins = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    //TODO init les infos de la chart pie 
  }
}

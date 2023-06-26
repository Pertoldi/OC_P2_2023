import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActiveElement, BubbleDataPoint, Chart, ChartConfiguration, ChartTypeRegistry, Point } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { IOlympicCountry } from 'src/app/core/models/Olympic.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<any> = of(null);

  public subTitles: {name: string, value:  number }[] = [];

  public chartType = 'pie';
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    onClick: (
      event: ChartEvent,
      elements: ActiveElement[],
      chart: Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>
    ) => {
      console.log('chart is :', chart.tooltip?.title);
      this.router.navigate([`./country/${chart.tooltip?.title[0]}`]);
      // TODO rediriger vers 404 dans le composant si la data n'est pas bonne 
    },
  };
  public chartLabels: string[] = [ ];
  public chartDatasets : {data: number []; backgroundColor: string[]}[] = [ {
    data: [],
    backgroundColor: []
  } ];
  public chartLegend = true;

  private chartColor = ['#956065','#793d52','#89a1db','#b8cbe7', '#bfe0f1'];
  private unsubscribe$ = new Subject<void>();
  public asyncFlag = false;

  constructor(private olympicService: OlympicService, private router: Router) {}


  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value: IOlympicCountry[]) => {
        console.log('value is :', value);
        if (value) { 
          value.forEach((element: IOlympicCountry, i: number) => {
            this.chartLabels.push(element.country);
            this.chartDatasets[0].data.push(element.participations.map(value => value.medalsCount).reduce( (acc, curr) => acc + curr));
            this.chartDatasets[0].backgroundColor.push(this.chartColor[i % this.chartColor.length]);
          });
          this.subTitles = [{name: 'Number of JOs', value:  value.length },{ name: 'Number of countries', value: value.length} ];
          this.asyncFlag = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

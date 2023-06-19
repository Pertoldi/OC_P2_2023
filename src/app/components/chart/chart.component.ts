import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() chartType! : any
  @Input() chartOptions! : any
  @Input() chartLabels! : any
  @Input() chartDatasets! : any
  @Input() chartLegend! : any
  @Input() chartPlugins! : any
}

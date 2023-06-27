import { Component, OnDestroy, OnInit } from '@angular/core';
import { IOlympicCountry } from 'src/app/core/models/Olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subject, Observable, of, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubTitle } from 'src/app/core/models/subTitle.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy{

  public olympics$: Observable<IOlympicCountry[] | undefined> = of(undefined);
  private unsubscribe$ = new Subject<void>();
  public asyncFlag = false;

  public countryName = '';
  public subTitles: ISubTitle[] = [];
  public countryData: {name: string, series: {name: string, value: number}[]}[] = [];

  constructor(
    private olympicService: OlympicService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {

    this.countryName = this.activatedRoute.snapshot.paramMap.get('countryName') || '';


    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IOlympicCountry[] | undefined) => {
        if (data) {
          const filteredData = data.filter(elt => elt.country === this.countryName);
          const isCountry = filteredData.length > 0;
          if (!isCountry) return this.router.navigate(['/']);
          this.countryData = [{
            name: this.countryName, 
            series: filteredData[0].participations.map(elt => {
              return {name: elt.year.toString(), value: elt.medalsCount};
            })
          }];
          this.asyncFlag = true;
        } 
        return 0;
      });
  }
  
  goBack() { 
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
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

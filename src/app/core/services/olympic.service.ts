import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ensureError } from 'src/app/core/utils/errorHandler';
import { IOlympicCountry } from '../models/Olympic.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympicCountry[] | undefined>(undefined);

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  loadInitialData() {
    return this.http.get<IOlympicCountry[] | undefined>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        if (error) {
          ensureError(error);
          this.toastr.error('Cannot get olympics data. Something went wrong try reloading');
        }
        this.olympics$.next(undefined);
        return caught;
      })
    );
  }

  getOlympics(): Observable<IOlympicCountry[] | undefined> {
    return this.olympics$.asObservable();
  }
}

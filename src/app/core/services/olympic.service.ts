import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ensureError } from 'src/app/core/utils/errorHandler';
import { IOlympicCountry } from '../models/Olympic.model';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        if (error) {
          ensureError(error);
          // TODO use toastWarning
          // can be useful to end loading state and let the user know something went wrong
        }
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics(): Observable<IOlympicCountry[] | undefined> {
    return this.olympics$.asObservable();
  }
}

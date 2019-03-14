import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from '../services/messages.service';

import { Countries } from '../models/Countries';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private apiURL: string = 'http://api.population.io:80/1.0/countries';  // URL to web api
  private log(message: string) {
    this.messagesService.add(`Get Data: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
  ) { }

  /** GET list of avaliable countries */
  getCountries(): Observable<Countries[]> {
      return this.http.get<Countries[]>(this.apiURL)
        .pipe(
          catchError(this.handleError('getCountries', []))
        );
  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}

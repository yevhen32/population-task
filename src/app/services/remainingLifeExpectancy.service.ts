import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from '../services/messages.service';

import { RemainingLifeExpectancy } from '../models/RemainingLifeExpectancy';

@Injectable({
  providedIn: 'root'
})

export class RemainingLifeExpectancyService {

  private apiURLBase: string = 'http://api.population.io:80/1.0/life-expectancy/remaining/';  // URL to web api male/United%20Kingdom/2001-05-11/49y2m/
  private apiURL: string = '';
  private log(message: string) {
    this.messagesService.add(`Get Data: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
  ) { }

  /** GET Remaining Life Expectancy */
  getRemainingLifeExpectancy(): Observable<RemainingLifeExpectancy> {
      return this.http.get<RemainingLifeExpectancy>(this.apiURL)
        /*.pipe(
          catchError(this.handleError('getRemainingLifeExpectancy'))
        );*/
  }

  formApiURL(params: string[]) {
    let paramsString: string = '';
    console.log(params);
    paramsString = params.map(param => encodeURIComponent(param)).join('/');
    this.apiURL = this.apiURLBase + paramsString;
    console.log(this.apiURL);
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

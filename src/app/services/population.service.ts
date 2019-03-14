import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from '../services/messages.service';

import { Population } from '../models/population';

@Injectable({
  providedIn: 'root'
})

export class PopulationService {

  private apiURL: string = 'http://api.population.io:80/1.0/population/1990/Slovak%20Republic/';  // URL to web api
  private log(message: string) {
    this.messagesService.add(`Get Data: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
  ) { }

  /** GET list of avaliable population */
  getPopulation(): Observable<Population[]> {
      return this.http.get<Population[]>(this.apiURL)
        .pipe(
          catchError(this.handleError('getPopulation', []))
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {

  constructor(private httpClient: HttpClient) {}

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;

  public addTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.httpClient.post<Trip>(this.tripUrl, formData); // Return Observable directly
  }

  public getTrip(tripCode: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip');
    return this.httpClient
      .get<Trip>(`${this.tripUrl}/${tripCode}`)
      .pipe(
        catchError(this.handleError)
      );
  }  

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.httpClient
    .get<Trip[]>(`${this.tripUrl}`)
    .pipe(catchError(this.handleError));
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);

    // Ensure the trip code is correctly appended to the URL
    const url = `${this.tripUrl}/${formData.code}`;
    
    return this.httpClient
      .put<Trip>(url, formData) // Ensure it's a typed PUT request for better handling
      .pipe(
        catchError(this.handleError)
      );
}


  public deleteTrip(tripCode: string): Observable<any> {
    if (!tripCode) {
      return throwError(() => new Error('Invalid trip code for deletion'));
    }
    console.log(`Inside TripDataService#deleteTrip for tripCode: ${tripCode}`);
    return this.httpClient
    .delete(`${this.tripUrl}/${tripCode}`)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Something has gone wrong', error); 
    return throwError(() => new Error(error.message || 'Server error'));
  }
}

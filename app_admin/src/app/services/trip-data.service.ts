import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { AuthResponse } from '../models/authresponse';
import { Trip } from '../models/trip';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(
    private httpClient: HttpClient, 
    @Inject(BROWSER_STORAGE) private storage: Storage) {}

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

  public register(user: User): Observable<AuthResponse> { 
    console.log('Inside TripDataService#register');
    return this.makeAuthApiCall('register', user);
  }
  
  public login(user: User): Observable<AuthResponse> {
    console.log('Inside TripDataService#login');
    return this.makeAuthApiCall('login', user);
  }  
  
  public makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    console.log(`Inside TripDataService#makeAuthApiCall('${urlPath}')`);
    if (!urlPath || !user) {
      return throwError(() => new Error('Invalid URL path or user data for authentication call'));
    }
    return this.httpClient
      .post<AuthResponse>(`${this.apiBaseUrl}/${urlPath}`, user)
      .pipe(
        catchError(this.handleError) // Handle errors using the custom error handler
      );
  }
  
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
  
    if (error.status) {
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Please check the entered data.';
          break;
        case 401:
          errorMessage = 'Unauthorized: Please log in and try again.';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource does not exist.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.statusText || 'Unexpected error'}`;
      }
    }
  
    console.error('HTTP Error:', error);
    return throwError(() => errorMessage);
  }  
  
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Booking {
  reservation_id: number;
  user_id: number;
  event_id: number;

}
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = "http://localhost:8080/reservation";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  createBooking(event_id: number): Observable<any> {
    const user_id = this.authService.getUser()?.id;
    if (!user_id) {
      return throwError(() => new Error('User not authenticated'));
    }
    
    return this.http.post(`${this.apiUrl}`, { user_id, event_id }).pipe(
      catchError(error => {
        console.error('Booking error:', error);
        return throwError(() => new Error(
          error.error?.message || 'Failed to complete booking'
        ));
      })
    );
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/allReservations`).pipe(
      catchError(error => {
        console.error('Error loading bookings:', error);
        return throwError(() => new Error(
          error.error?.message || 'Failed to load bookings'
        ));
      })
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';

interface Booking {
  reservation_id: number;
  user_id: number;
  event_id: number;
  // event_name?: string;
  // user_name?: string;
}

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [ MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;
  displayedColumns: string[] = ['reservation_id', 'event_id', 'user_id'];

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to load bookings', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventService } from '../../services/events.service';

type Event = {
  event_id: number;
  eventname: string;
  description: string;
  type: string;
};

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;

  constructor(
    private eventsService: EventService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventsService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events as Event[];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading events', err);
        this.snackBar.open('Failed to load events', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onBook(event: Event): void {
    this.snackBar.open(`Booking ${event.eventname}`, 'Close', { duration: 2000 });
  }

  onEdit(event: Event): void {
    this.snackBar.open(`Editing ${event.eventname}`, 'Close', { duration: 2000 });
  }

  onDelete(event: Event): void {
    if (confirm(`Are you sure you want to delete "${event.eventname}"?`)) {
      this.eventsService.deleteEvent(event.event_id).subscribe({
        next: () => {
          this.snackBar.open('Event deleted', 'Close', { duration: 2000 });
          this.loadEvents();
        },
        error: (err) => {
          this.snackBar.open('Delete failed', 'Close', { duration: 2000 });
          console.error(err);
        }
      });
    }
  }
}
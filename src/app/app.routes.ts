import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { BookingComponent } from './components/booking/booking.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'users', component: UserListComponent, canActivate:[AuthGuard, AdminGuard]},
  { path: 'bookings', component: BookingComponent, canActivate:[AuthGuard]},
  // { path: 'reservations', component: ReservationsComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

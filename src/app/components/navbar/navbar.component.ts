import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;

  constructor(
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    
    if (this.authService.userUpdated$) {
      this.authService.userUpdated$.subscribe(() => {
        this.currentUser = this.authService.getUser();
      });
    }
  }

  openCreateDialog(): void {
      const dialogRef = this.dialog.open(EventFormComponent, {
        width: '600px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['/events'])
        }
      });
    }

  logout(): void {
    this.authService.removeAuthData();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
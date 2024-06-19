import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class LogoutComponent {
  constructor(private router: Router) { }

  logout() {
    // Redirect to the home page
    this.router.navigate(['/home', { skipLocationChange: true }]);


  }
}

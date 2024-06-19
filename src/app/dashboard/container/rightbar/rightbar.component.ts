import { Component } from '@angular/core';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrl: './rightbar.component.css'
})
export class RightbarComponent {
  
  constructor() { }

  preventDefault(event: Event) {
    event.preventDefault();
  }
}

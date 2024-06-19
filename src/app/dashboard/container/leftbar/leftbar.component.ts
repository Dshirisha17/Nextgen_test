import { Component} from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrl: './leftbar.component.css'
})
export class LeftbarComponent {
  panelOpenState = false;

  constructor() { }

  preventDefault(event: Event) {
    event.preventDefault();
  }
}

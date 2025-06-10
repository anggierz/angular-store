import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {

  constructor(private router: Router) { }

  onClick(): void {
    console.log('Tooltip clicked');
    this.router.navigate(['']);
  }

}

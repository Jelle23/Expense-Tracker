import { Component } from '@angular/core';
import { TotalComponent } from '../total/total.component';
import { MonthsComponent } from '../months/months.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TotalComponent, MonthsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

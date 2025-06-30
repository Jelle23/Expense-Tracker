import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TotalComponent } from './components/total/total.component';
import { MonthsComponent } from './components/months/months.component';
import { GoalsComponent } from './components/goals/goals.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionComponent, TotalComponent, MonthsComponent, GoalsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  } 

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  } 

}

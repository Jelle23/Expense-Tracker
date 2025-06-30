import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component'; 
import { TransactionComponent } from './app/components/transaction/transaction.component';  
import { OverviewComponent } from './app/components/overview/overview.component';
import { HomeComponent } from './app/components/home/home.component';
import { GoalsComponent } from './app/components/goals/goals.component';

const routes: Route[] = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionComponent },
  { path: 'overview', component: OverviewComponent},
  { path: 'goals', component: GoalsComponent},
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)], 
}).catch((err) => console.error(err));

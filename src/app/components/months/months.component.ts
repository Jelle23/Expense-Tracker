import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Transaction, TransactionService } from '../../services/transaction.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-months',
  standalone: true,
  imports: [CommonModule, FormsModule, CapitalizePipe],
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {
  private monthOrder = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  transactions: Transaction[] = [];
  groupedTransactions: {
    [year: string]: {
      [month: string]: {
        totalIncome: number;
        totalExpenses: number;
        incomeList: Transaction[];
        expenseList: Transaction[];
      };
    };
  } = {};

  selectedMonthDetails: {
    month: string;
    incomeList: Transaction[];
    expenseList: Transaction[];
  } | null = null;

  selectedYear: string = ''; // Keep track of selected year
  years: string[] = []; // List of available years

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
    this.groupTransactionsByYearAndMonth();
  }

  private groupTransactionsByYearAndMonth(): void {

    const uniqueYears = Array.from(new Set(this.transactions.map(t => t.date.getFullYear().toString())));
    uniqueYears.forEach(year => {
      if (!this.groupedTransactions[year]) {
        this.groupedTransactions[year] = {};
      }

      this.monthOrder.forEach(month => {
        if (!this.groupedTransactions[year][month]) {
          this.groupedTransactions[year][month] = {
            totalIncome: 0,
            totalExpenses: 0,
            incomeList: [],
            expenseList: []
          };
        }
      });
    });

    this.transactions.forEach(transaction => {
      const year = transaction.date.getFullYear().toString();
      const month = transaction.date.toLocaleString('en-US', { month: 'long' });

      if (transaction.type === 'income') {
        this.groupedTransactions[year][month].totalIncome += transaction.amount;
        this.groupedTransactions[year][month].incomeList.push(transaction);
      } else if (transaction.type === 'expense') {
        this.groupedTransactions[year][month].totalExpenses += transaction.amount;
        this.groupedTransactions[year][month].expenseList.push(transaction);
      }
    });

    this.years = uniqueYears.sort(); 
    this.selectedYear = this.years[0];
  }

  get groupedTransactionKeysForSelectedYear(): string[] {
    const months = Object.keys(this.groupedTransactions[this.selectedYear] || {});
    return months.sort((a, b) => this.monthOrder.indexOf(a) - this.monthOrder.indexOf(b));
  }

  selectYear(year: string): void {
    this.selectedYear = year;
  }

  openMonthDetails(month: string): void {
    const details = this.groupedTransactions[this.selectedYear][month];
    if (details) {
      this.selectedMonthDetails = {
        month,
        incomeList: details.incomeList,
        expenseList: details.expenseList
      };
    }
  }

  closeModal(): void {
    this.selectedMonthDetails = null;
  }
}

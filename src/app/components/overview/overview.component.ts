import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Transaction, TransactionService } from '../../services/transaction.service';

interface ChartData {
  name: string;
  value: number;
}

interface GroupedTransactions {
  [key: string]: {
    totalIncome: number;
    totalExpenses: number;
    incomeList: Transaction[];
    expenseList: Transaction[];
  };
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  transactions: Transaction[] = [];
  groupedTransactions: GroupedTransactions = {}; // Explicitly define the type here

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
    this.updateCharts();
  }

  // Explicitly typing chart data as an array of ChartData
  incomeChartData: ChartData[] = [];
  expenseChartData: ChartData[] = [];
  donutChartData: ChartData[] = [];

  // Chart options
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showLabels = true;
  doughnut = true;

  updateCharts() {
    const incomeData = this.transactions.filter(transaction => transaction.type === 'income');
    const expenseData = this.transactions.filter(transaction => transaction.type === 'expense');

    // Group by category
    const incomeByCategory = this.groupByCategory(incomeData);
    const expenseByCategory = this.groupByCategory(expenseData);

    // Sort by amount
    this.incomeChartData = this.sortDataByAmount(incomeByCategory);
    this.expenseChartData = this.sortDataByAmount(expenseByCategory);

    // Donut chart data: Income vs Expenses
    const totalIncome = this.incomeChartData.reduce((sum, item) => sum + item.value, 0);
    const totalExpense = this.expenseChartData.reduce((sum, item) => sum + item.value, 0);

    this.donutChartData = [
      { name: 'Income', value: totalIncome },
      { name: 'Expenses', value: totalExpense }
    ];
  }

  groupByCategory(data: Transaction[]): any {
    return data.reduce((result, transaction) => {
      const category = transaction.category;
      if (!result[category]) {
        result[category] = { total: 0, list: [] };
      }
      result[category].total += transaction.amount;
      result[category].list.push(transaction);
      return result;
    }, {} as { [key: string]: { total: number; list: Transaction[] } });
  }

  sortDataByAmount(data: { [key: string]: { total: number; list: Transaction[] } }): ChartData[] {
    return Object.keys(data)
      .map(key => ({ name: key, value: data[key].total }))
      .sort((a, b) => b.value - a.value);  // Sort descending by value
  }
}

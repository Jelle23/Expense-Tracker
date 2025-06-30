import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Transaction, TransactionService } from '../../services/transaction.service';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';


@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, CapitalizePipe],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  transactions: Transaction[] = [];
  categories: string[] = ['Work', 'Food', 'Car', 'Extra', 'Entertainment', 'Football', 'School', 'Healthcare', 'Gift', 'Vacation', 'Tax', 'Clothes', 'Income'];
  selectedCategory: string = '';
  selectedMonth: string = '';
  filteredTransactions: Transaction[] = [...this.transactions];
  editingTransaction: Transaction | null = null;
  groupedTransactions: { [key: string]: Transaction[] } = {};
  transactionsByMonth: { [month: string]: Transaction[] } = {};

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions().map(t => ({
      ...t,
      date: new Date(t.date) // convert date string to Date object
    }));
    this.groupTransactionsByMonth();
    this.filteredTransactions = [...this.transactions]; // initialize filtered transactions too
  }


  groupTransactionsByMonth() {
    this.transactionsByMonth = this.transactions.reduce((acc, transaction) => {
      const month = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(transaction.date);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(transaction);
      return acc;
    }, {} as { [month: string]: Transaction[] });
  }

  getMonths(): string[] {
    return Object.keys(this.transactionsByMonth);
  }

  filterByMonth(month: string) {
    this.selectedMonth = month;
  }

  getFilteredTransactions(): Transaction[] {
    return this.selectedMonth ? this.transactionsByMonth[this.selectedMonth] : this.transactions;
  }

  filterByCategory() {
    if (this.selectedCategory) {
      this.filteredTransactions = this.transactions.filter(
        (transaction) => transaction.category === this.selectedCategory
      );
    } else {
      this.filteredTransactions = [...this.transactions];  
    }
  }

  getTotalForFilteredCategory(): number {
    return this.filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  }

  objectKeys(obj: { [key: string]: any }) {
    return Object.keys(obj);
  }
  groupTransactionsByCategory() {
    this.transactions.forEach(transaction => {
      if (!this.groupedTransactions[transaction.category]) {
        this.groupedTransactions[transaction.category] = [];
      }
      this.groupedTransactions[transaction.category].push(transaction);
    });
  }

  getTotalsByCategory() {
    const totals: { [key: string]: number } = {};
    for (const category of this.categories) {
      totals[category] = this.transactions
        .filter((t) => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0);
    }
    return totals;
  }

  startNewTransaction() {
    // Find max existing id (assuming ids are numeric strings)
    const maxId = this.transactions.reduce((max, t) => {
      const idNum = parseInt(t.id, 10);
      return idNum > max ? idNum : max;
    }, 0);

    this.editingTransaction = {
      id: (maxId + 1).toString(),  // generate next id as string
      text: '',
      amount: 0,
      date: new Date(),
      category: this.categories[0],
      type: 'income'
    };
  }




deleteTransaction(id: string) {
  this.transactionService.deleteTransaction(id);
  this.transactions = this.transactions.filter(t => t.id !== id);
}



  editTransaction(transaction: Transaction) {
    console.log(this.editingTransaction)
    this.editingTransaction = {...transaction}
  }

  saveTransaction() {
    if (this.editingTransaction) {
      this.editingTransaction.date = new Date(this.editingTransaction.date);

      const existingIndex = this.transactions.findIndex(t => t.id === this.editingTransaction!.id);

      if (existingIndex !== -1) {
        // Update existing transaction via service
        this.transactionService.updateTransaction(this.editingTransaction);
        this.transactions[existingIndex] = { ...this.editingTransaction };
      } else {
        // Add new transaction via service
        this.transactionService.addTransaction(this.editingTransaction);
        this.transactions.push(this.editingTransaction);
      }

      this.groupTransactionsByMonth();

      this.selectedCategory = '';
      this.selectedMonth = '';
      this.filteredTransactions = [...this.transactions];

      this.editingTransaction = null;
    }
  }

  cancelEdit() {
    this.editingTransaction = null; // Exit edit mode without saving
  }
}

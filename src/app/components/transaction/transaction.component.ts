import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { GoalService, Goal } from '../../services/goal.service'; // adjust path if needed
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
  categories: string[] = ['Work', 'Food', 'Car', 'Extra', 'Entertainment', 'Football', 'School', 'Healthcare', 'Gift', 'Vacation', 'Tax', 'Clothes', 'Income', 'Goals'];
  selectedMonth: string = '';
  filteredTransactions: Transaction[] = [...this.transactions];
  editingTransaction: Transaction | null = null;
  groupedTransactions: { [key: string]: Transaction[] } = {};
  transactionsByMonth: { [month: string]: Transaction[] } = {};
  goals: Goal[] = [];

  private _selectedCategory: string = '';

  get selectedCategory(): string {
    return this._selectedCategory;
  }

  set selectedCategory(value: string) {
    this._selectedCategory = value;

    if (this.editingTransaction) {
      this.editingTransaction.category = value;

      // Lock type to 'expense' if 'Goals' selected
      if (value === 'Goals') {
        this.editingTransaction.type = "expense";
        this.editingTransaction = { ...this.editingTransaction };
      }
    }

    this.filterByCategory();
  }

  constructor(
    private transactionService: TransactionService,
    private goalService: GoalService,
  ) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions().map(t => ({
      ...t,
      date: new Date(t.date) // convert date string to Date object
    }));
    this.groupTransactionsByMonth();
    this.filteredTransactions = [...this.transactions]; // initialize filtered transactions too

    this.goals = this.goalService.getGoals();
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
    if (this._selectedCategory) {
      this.filteredTransactions = this.transactions.filter(
        (transaction) => transaction.category === this._selectedCategory
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

      if (this.editingTransaction.category === 'Goals') {
        this.goalService.applyTransactionToGoal(
          this.editingTransaction.text,
          this.editingTransaction.amount
        );

        // Optional: refresh the goals array from the service
        this.goals = this.goalService.getGoals();
      }

      this.groupTransactionsByMonth();

      this._selectedCategory = '';
      this.selectedMonth = '';
      this.filteredTransactions = [...this.transactions];

      this.editingTransaction = null;
    }
  }

  onCategoryChange(newCategory: string) {
    if (this.editingTransaction) {
      this.editingTransaction.category = newCategory;

      if (newCategory === 'Goals') {
        this.editingTransaction.type = 'expense';
      }
      // else, you could keep existing type or set a default
    }
  }

  cancelEdit() {
    this.editingTransaction = null; // Exit edit mode without saving
  }
}

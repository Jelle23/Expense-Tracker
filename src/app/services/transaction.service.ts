import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Transaction {
  id: string;
  text: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: Date;
  goal?: string;
}

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private localStorageKey = "transactions";

  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.loadFromLocalStorage());

  // Expose as Observable for subscription
  transactions$ = this.transactionsSubject.asObservable();

  constructor() {
    // Save to localStorage whenever transactions change
    this.transactions$.subscribe(transactions => {
      this.saveToLocalStorage(transactions);
    });
  }

  private loadFromLocalStorage(): Transaction[] {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      const parsed = JSON.parse(data) as (Omit<Transaction, 'date'> & { date: string })[];
      // Convert date strings back to Date objects
      return parsed.map(t => ({ ...t, date: new Date(t.date) }));
    }
    // Fallback default data if nothing in localStorage
    return [
    { id:"1", text: "Freelance", type: "income", category: "Work", amount: 320.50, date: new Date("2023-01-15") },
    { id:"2", text: "Groceries", type: "expense", category: "Food", amount: 56.20, date: new Date("2023-01-17") },
    { id:"3", text: "Bus Ticket", type: "expense", category: "Transport", amount: 3.50, date: new Date("2023-01-20") },
    { id:"4", text: "Gift from Uncle", type: "income", category: "Gift", amount: 75.00, date: new Date("2023-02-01") },
    { id:"5", text: "Netflix", type: "expense", category: "Entertainment", amount: 11.99, date: new Date("2023-02-05") },
    { id:"6", text: "Sold Old Laptop", type: "income", category: "Extra", amount: 150.00, date: new Date("2023-02-10") },
    { id:"7", text: "Fuel", type: "expense", category: "Car", amount: 45.30, date: new Date("2023-02-12") },
    { id:"8", text: "Groceries", type: "expense", category: "Food", amount: 62.10, date: new Date("2023-02-15") },
    { id:"9", text: "February Salary", type: "income", category: "Income", amount: 1250.00, date: new Date("2023-02-28") },
    { id:"10", text: "Amazon Purchase", type: "expense", category: "Shopping", amount: 39.99, date: new Date("2023-03-03") },
    { id:"11", text: "Dinner with Friends", type: "expense", category: "Food", amount: 28.00, date: new Date("2023-03-08") },
    { id:"12", text: "Freelance Job", type: "income", category: "Work", amount: 180.00, date: new Date("2023-03-10") },
    { id:"13", text: "Shopping", type: "expense", category: "Food", amount: 91.52, date: new Date("2023-03-13") },
    { id:"14", text: "Gift from Aunt", type: "income", category: "Football", amount: 63.94, date: new Date("2023-03-13") },
    { id:"15", text: "Phone Bill", type: "expense", category: "Utilities", amount: 22.50, date: new Date("2023-03-12") },
    { id:"16", text: "Train Ticket", type: "expense", category: "Transport", amount: 6.25, date: new Date("2023-03-15") },
    { id:"17", text: "March Salary", type: "income", category: "Income", amount: 1300.00, date: new Date("2023-03-31") },
    { id:"18", text: "Cinema", type: "expense", category: "School", amount: 311.97, date: new Date("2023-05-09") },
    { id:"19", text: "Salary", type: "income", category: "Income", amount: 399.35, date: new Date("2023-05-20") },
    { id:"20", text: "Coffee", type: "expense", category: "Food", amount: 3.75, date: new Date("2023-05-01") },
    { id:"21", text: "Spotify", type: "expense", category: "Entertainment", amount: 9.99, date: new Date("2023-05-02") },
    { id:"22", text: "Groceries", type: "expense", category: "Extra", amount: 465.34, date: new Date("2023-08-05") },
    { id:"23", text: "Movie Night", type: "expense", category: "Entertainment", amount: 12.00, date: new Date("2023-07-10") },
    { id:"24", text: "Fuel", type: "expense", category: "School", amount: 245.81, date: new Date("2023-07-31") },
    { id:"25", text: "Fuel", type: "expense", category: "Car", amount: 52.00, date: new Date("2023-07-12") },
    { id:"26", text: "Books", type: "expense", category: "Vacation", amount: 475.54, date: new Date("2023-08-17") },
    { id:"27", text: "Holiday Trip", type: "expense", category: "Vacation", amount: 21.19, date: new Date("2023-09-25") },
    { id:"28", text: "Dentist", type: "expense", category: "Vacation", amount: 257.02, date: new Date("2023-09-13") },
    { id:"29", text: "Holiday Trip", type: "expense", category: "Healthcare", amount: 38.14, date: new Date("2023-09-29") },
    { id:"30", text: "Groceries", type: "expense", category: "Healthcare", amount: 352.96, date: new Date("2023-10-10") },
    { id:"31", text: "Dentist", type: "expense", category: "Extra", amount: 275.98, date: new Date("2023-10-27") },
    { id:"32", text: "Dentist", type: "expense", category: "Entertainment", amount: 281.25, date: new Date("2023-12-17") },
    { id:"33", text: "Bonus", type: "income", category: "Football", amount: 494.96, date: new Date("2023-12-23") },
    { id:"34", text: "Cinema", type: "expense", category: "Entertainment", amount: 9.99, date: new Date("2023-04-02") },
    { id:"35", text: "Grocery Store", type: "expense", category: "Food", amount: 47.65, date: new Date("2023-04-04") },
    { id:"36", text: "Sold Bike", type: "income", category: "Extra", amount: 80.00, date: new Date("2023-04-10") },
    { id:"37", text: "Fuel", type: "expense", category: "Car", amount: 49.99, date: new Date("2023-04-15") },
    { id:"38", text: "April Salary", type: "income", category: "Income", amount: 1350.00, date: new Date("2023-04-30") },
    { id:"39", text: "Doctor Visit", type: "expense", category: "Healthcare", amount: 50.00, date: new Date("2023-07-01") },
    { id:"40", text: "Freelance", type: "income", category: "Work", amount: 200.00, date: new Date("2023-07-08") },
    { id:"41", text: "May Salary", type: "income", category: "Income", amount: 1400.00, date: new Date("2023-05-31") },
    { id:"42", text: "Bought Headphones", type: "expense", category: "Shopping", amount: 89.99, date: new Date("2023-06-03") },
    { id:"43", text: "BBQ Party", type: "expense", category: "Food", amount: 25.00, date: new Date("2023-06-05") },
    { id:"44", text: "Fuel", type: "expense", category: "Entertainment", amount: 11.01, date: new Date("2023-06-14") },
    { id:"45", text: "Cinema", type: "expense", category: "Food", amount: 464.74, date: new Date("2025-10-12") },
    { id:"46", text: "Dentist", type: "expense", category: "Healthcare", amount: 119.87, date: new Date("2024-10-14") },
    { id:"47", text: "Dentist", type: "expense", category: "Healthcare", amount: 64.58, date: new Date("2024-08-15") },
    { id:"48", text: "Tax Payment", type: "expense", category: "Healthcare", amount: 214.3, date: new Date("2024-04-15") },
    { id:"49", text: "Fuel", type: "expense", category: "Vacation", amount: 136.44, date: new Date("2025-12-07") },
    { id:"50", text: "Fuel", type: "expense", category: "Vacation", amount: 9.84, date: new Date("2025-02-09") },
    { id:"51", text: "Tax Payment", type: "expense", category: "Entertainment", amount: 245.17, date: new Date("2025-09-16") },
    { id:"52", text: "Holiday Trip", type: "expense", category: "School", amount: 445.71, date: new Date("2025-12-06") },
    { id:"53", text: "Cinema", type: "expense", category: "Healthcare", amount: 361.14, date: new Date("2024-11-17") },
    { id:"54", text: "Groceries", type: "expense", category: "Healthcare", amount: 443.26, date: new Date("2025-06-29") },
    { id:"55", text: "Football Coaching", type: "income", category: "Work", amount: 276.39, date: new Date("2025-12-13") },
    { id:"56", text: "Part-time Job", type: "income", category: "Gift", amount: 207.4, date: new Date("2024-03-18") },
    { id:"57", text: "Fuel", type: "expense", category: "Healthcare", amount: 96.91, date: new Date("2024-12-24") },
    { id:"58", text: "Shopping", type: "expense", category: "Vacation", amount: 36.96, date: new Date("2025-11-23") },
    { id:"59", text: "Cinema", type: "expense", category: "Healthcare", amount: 202.55, date: new Date("2024-09-03") },
    { id:"60", text: "Groceries", type: "expense", category: "Healthcare", amount: 484.58, date: new Date("2024-10-29") },
    { id:"61", text: "Books", type: "expense", category: "School", amount: 99.37, date: new Date("2024-07-18") },
    { id:"62", text: "Salary", type: "income", category: "Gift", amount: 327.52, date: new Date("2025-09-26") },
    { id:"63", text: "Fuel", type: "expense", category: "Extra", amount: 396.96, date: new Date("2024-07-26") },
    { id:"64", text: "Tax Payment", type: "expense", category: "Tax", amount: 166.55, date: new Date("2025-11-26") },
    { id:"65", text: "Holiday Trip", type: "expense", category: "Car", amount: 89.48, date: new Date("2024-12-04") },
    { id:"66", text: "Taxi", type: "expense", category: "Vacation", amount: 99.34, date: new Date("2024-09-29") },
    { id:"67", text: "Freelance", type: "income", category: "Football", amount: 499.77, date: new Date("2024-11-11") },
    { id:"68", text: "Taxi", type: "expense", category: "Entertainment", amount: 34.01, date: new Date("2024-08-25") },
    { id:"69", text: "BBQ Party", type: "expense", category: "Entertainment", amount: 143.64, date: new Date("2024-06-04") },
    { id:"70", text: "Bonus", type: "income", category: "School", amount: 374.62, date: new Date("2025-06-14") },
    { id:"71", text: "Shopping", type: "expense", category: "Entertainment", amount: 166.96, date: new Date("2025-05-28") },
    { id:"72", text: "Bonus", type: "income", category: "Income", amount: 488.47, date: new Date("2025-06-29") },
    { id:"73", text: "Tax Payment", type: "expense", category: "Entertainment", amount: 299.87, date: new Date("2025-12-14") },
    { id:"74", text: "Books", type: "expense", category: "Vacation", amount: 195.69, date: new Date("2024-06-23") },
    { id:"75", text: "Taxi", type: "expense", category: "Vacation", amount: 276.86, date: new Date("2025-09-23") },
    { id:"76", text: "Shopping", type: "expense", category: "Shopping", amount: 25.38, date: new Date("2024-04-22") },
    { id:"77", text: "Books", type: "expense", category: "Car", amount: 77.01, date: new Date("2025-04-25") },
    { id:"78", text: "Bonus", type: "income", category: "Gift", amount: 441.21, date: new Date("2024-08-11") },
    { id:"79", text: "Tax Payment", type: "expense", category: "Healthcare", amount: 168.63, date: new Date("2024-12-20") },
    { id:"80", text: "Salary", type: "income", category: "Work", amount: 321.02, date: new Date("2025-02-17") },
    { id:"81", text: "Taxi", type: "expense", category: "Vacation", amount: 25.17, date: new Date("2025-07-01") },
    { id:"82", text: "Fuel", type: "expense", category: "School", amount: 135.58, date: new Date("2025-05-14") },
    { id:"83", text: "Shopping", type: "expense", category: "School", amount: 463.55, date: new Date("2025-04-20") },
    { id:"84", text: "Freelance", type: "income", category: "Work", amount: 227.51, date: new Date("2024-11-29") },
    { id:"85", text: "Taxi", type: "expense", category: "Shopping", amount: 331.28, date: new Date("2025-03-27") },
    { id:"86", text: "Salary", type: "income", category: "Gift", amount: 312.91, date: new Date("2025-02-27") },
    { id:"87", text: "Taxi", type: "expense", category: "School", amount: 38.47, date: new Date("2024-10-25") },
    { id:"88", text: "Taxi", type: "expense", category: "Extra", amount: 314.14, date: new Date("2024-09-25") },
    { id:"89", text: "Shopping", type: "expense", category: "Car", amount: 19.91, date: new Date("2024-11-25") },
    { id:"90", text: "Shopping", type: "expense", category: "Extra", amount: 347.22, date: new Date("2024-11-06") },
    { id:"91", text: "Taxi", type: "expense", category: "Entertainment", amount: 241.87, date: new Date("2025-01-06") },
    { id:"92", text: "Tax Payment", type: "expense", category: "Tax", amount: 270.14, date: new Date("2024-12-30") },
    { id:"93", text: "Taxi", type: "expense", category: "Entertainment", amount: 292.59, date: new Date("2024-06-02") },
    { id:"94", text: "Groceries", type: "expense", category: "Extra", amount: 83.21, date: new Date("2024-04-11") },
    { id:"95", text: "Fuel", type: "expense", category: "School", amount: 488.06, date: new Date("2024-07-21") },
    { id:"96", text: "Taxi", type: "expense", category: "Food", amount: 19.18, date: new Date("2024-08-01") },
    { id:"97", text: "Taxi", type: "expense", category: "School", amount: 199.93, date: new Date("2024-08-05") },
    { id:"98", text: "Taxi", type: "expense", category: "Food", amount: 97.75, date: new Date("2024-08-11") },
    { id:"99", text: "Bonus", type: "income", category: "School", amount: 249.93, date: new Date("2024-05-10") },
    { id:"100", text: "Taxi", type: "expense", category: "School", amount: 88.64, date: new Date("2024-04-29") }
    ];
  }

  private saveToLocalStorage(transactions: Transaction[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(transactions));
  }

  // Get current value synchronously
  getTransactions(): Transaction[] {
    return this.transactionsSubject.value;
  }

  // Add new transaction and emit updated array
  addTransaction(newTransaction: Transaction) {
    const current = this.transactionsSubject.value;
    this.transactionsSubject.next([...current, newTransaction]);
  }

  // Update existing transaction by id
  updateTransaction(updatedTransaction: Transaction) {
    const current = this.transactionsSubject.value;
    const index = current.findIndex(t => t.id === updatedTransaction.id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = updatedTransaction;
      this.transactionsSubject.next(updated);
    }
  }

  // Delete transaction by id
  deleteTransaction(id: string) {
    const updated = this.transactionsSubject.value.filter(t => t.id !== id);
    this.transactionsSubject.next(updated);
  }
}
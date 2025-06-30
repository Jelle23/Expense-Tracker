import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [],
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
  transactions: Transaction[] = [];
  
  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
  }

  getTotalBalance(): string {
    const balance = this.transactions.reduce((sum, transaction) => 
      transaction.type === 'income' ? sum + transaction.amount : sum - transaction.amount, 
    0);

    return balance.toFixed(2); 
  }
}

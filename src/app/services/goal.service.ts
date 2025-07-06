import { Injectable } from '@angular/core';

export interface Goal {
  title: string;
  targetAmount: number;
  currentAmount: number;
  category?: string;
}

@Injectable({ providedIn: 'root' })
export class GoalService {
  private localStorageKey = 'goals';
  private goals: Goal[] = [];

  constructor() {
    this.goals = this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): Goal[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [
      { title: 'Buy a House', targetAmount: 50000, currentAmount: 20250 },
      { title: 'Start a Business', targetAmount: 30000, currentAmount: 3450 },
      { title: 'Retirement Fund', targetAmount: 100000, currentAmount: 4150 },
      { title: 'Kids’ College Fund', targetAmount: 80000, currentAmount: 3680 },
      { title: 'Dream Wedding', targetAmount: 20000, currentAmount: 6560 }
    ];
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.goals));
  }

  getGoals(): Goal[] {
    return [...this.goals];
  }

  addGoal(goal: Goal) {
    this.goals.push(goal);
    this.saveToLocalStorage();
  }

  updateGoal(goal: Goal) {
    const index = this.goals.findIndex(g => g.title === goal.title);
    if (index !== -1) {
      this.goals[index] = goal;
      this.saveToLocalStorage();
    }
  }

  applyTransactionToGoal(goalTitle: string, amount: number) {
    const goal = this.goals.find(g => g.title === goalTitle);
    if (goal) {
      goal.currentAmount += amount;
      if (goal.currentAmount > goal.targetAmount) {
        goal.currentAmount = goal.targetAmount;
      }
      this.saveToLocalStorage();
    }
  }

  getGoalsSortedByProgress(): Goal[] {
    return [...this.goals].sort((a, b) => {
      const aProgress = a.currentAmount / a.targetAmount;
      const bProgress = b.currentAmount / b.targetAmount;
      return bProgress - aProgress; // descending order
    });
  }
}

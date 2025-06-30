import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Goal {
  title: string;
  targetAmount: number;
  currentAmount: number;
  category?: string;
}


@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {
  goals: Goal[] = [];

  newGoal: Goal = {
    title: '',
    targetAmount: 0,
    currentAmount: 0,
  };

  addGoal() {
    this.goals.push({ ...this.newGoal });
    this.newGoal = { title: '', targetAmount: 0, currentAmount: 0 };
  }

  updateProgress(goal: Goal, amount: number) {
    goal.currentAmount += amount;
    if (goal.currentAmount > goal.targetAmount) {
      goal.currentAmount = goal.targetAmount;
    }
  }

  getProgressPercentage(goal: Goal): number {
    return (goal.currentAmount / goal.targetAmount) * 100;
  }
}

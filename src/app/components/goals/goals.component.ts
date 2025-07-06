import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Goal, GoalService } from '../../services/goal.service'; 

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

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.goals = this.goalService.getGoalsSortedByProgress();
  }

  addGoal() {
    this.goalService.addGoal({ ...this.newGoal });
    this.goals = this.goalService.getGoalsSortedByProgress(); // Refresh view
    this.newGoal = { title: '', targetAmount: 0, currentAmount: 0 };
  }

  updateProgress(goal: Goal, amount: number) {
    this.goalService.applyTransactionToGoal(goal.title, amount);
    this.goals = this.goalService.getGoalsSortedByProgress(); // Refresh view
  }

  getProgressPercentage(goal: Goal): number {
    return (goal.currentAmount / goal.targetAmount) * 100;
  }

    getProgressColor(goal: Goal): string {
    const percent = this.getProgressPercentage(goal);
    if (percent >= 80) return 'green';
    if (percent >= 40) return 'orange';
    return 'red';
  }

}

import { Component } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, TaskListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selectedTask: any = null;
  refreshFlag = false;

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('basicAuthToken');
    this.router.navigate(['/login']);
  }
  onTaskSelected(task: any) {
    this.selectedTask = task;
  }

  onTaskSubmit() {
    this.selectedTask = null;
    this.refreshFlag = !this.refreshFlag;
  }
}

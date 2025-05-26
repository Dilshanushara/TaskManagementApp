import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  @Input() task: Task | null = null;
  @Output() taskSubmitted = new EventEmitter<void>();

  // Note: For assignment/demo purposes, status options are hardcoded.
  // In a real-world scenario, these should be fetched dynamically via an API call.
  statusOptions = ['To Do', 'In Progress', 'Completed'];
  newTask: Task = { title: '', description: '', status: 'To Do' };
  successMessage = '';
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.newTask = { ...this.task };
    }
  }

  createOrEditTask(taskForm: NgForm) {
    if (this.newTask.id) {
      // Update existing task
      this.taskService.updateTask(this.newTask).subscribe({
        next: () => {
          this.successMessage = 'Task updated successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000); // hide the message after 3 seconds
        },
        error: (err) => {
          this.errorMessage = 'Failed to update task. Please try again.';
          setTimeout(() => (this.errorMessage = ''), 3000); // hide the message after 3 seconds
        },
      });
    } else {
      // Create new task
      this.taskService.createTask(this.newTask).subscribe({
        next: () => {
          this.successMessage = 'Task created successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000); // hide the message after 3 seconds
        },
        error: (err) => {
          this.errorMessage = 'Failed to create task. Please try again.';
          setTimeout(() => (this.errorMessage = ''), 3000); // hide the message after 3 seconds
        },
      });
    }
  }

  resetForm() {
    this.newTask = { title: '', description: '', status: 'To Do' };
    this.taskSubmitted.emit();
  }
}

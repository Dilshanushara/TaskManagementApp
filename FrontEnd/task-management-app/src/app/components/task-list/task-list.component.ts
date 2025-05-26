import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnChanges {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  filterText: string = '';
  filteredTasks: Task[] = [];
  sortColumn: keyof Task | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  @Input() taskSubmitted: boolean = false;
  @Output() taskSelected = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskSubmitted']) {
      // Re-fetch tasks when trigger changes
      this.loadTasks();
    }
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilters();
      },
      error: (err) => {
        alert('Unable to load tasks. Please try again later.');
      },
    });
  }

  public selectTask(task: Task): void {
    this.selectedTask = task;
  }

  public deleteTask(): void {
    if (this.selectedTask && this.selectedTask.id) {
      const confirmDelete = confirm(
        'Are you sure you want to delete this task?'
      );
      if (confirmDelete) {
        this.taskService.deleteTask(this.selectedTask.id).subscribe({
          next: () => {
            alert('Task deleted successfully');
            this.selectedTask = null;
            this.loadTasks();
          },
          error: (err) => {
            alert('Failed to delete task. Please try again.');
          },
        });
      }
    }
  }

  public editTask(): void {
    if (this.selectedTask) {
      this.taskSelected.emit(this.selectedTask);
    }
  }

  public applyFilters(): void {
    // Filter tasks based on filterText (case-insensitive)
    const filter = this.filterText.trim().toLowerCase();

    this.filteredTasks = this.tasks.filter((task) => {
      const matchesTaskId = task.id?.toString().includes(filter);
      const matchesTitle = task.title.toLowerCase().includes(filter);
      const matchesStatus = task.status.toLowerCase().includes(filter);
      const matchesDescription = task.description
        .toLowerCase()
        .includes(filter);

      return (
        matchesTaskId || matchesTitle || matchesStatus || matchesDescription
      );
    });
  }

  public sortBy(column: keyof Task): void {
    if (this.sortColumn === column) {
      // Toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.applySorting();
  }

  applySorting() {
    if (!this.sortColumn) return;

    this.filteredTasks.sort((a, b) => {
      let aValue = a[this.sortColumn!];
      let bValue = b[this.sortColumn!];

      // Normalize values
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      // Handle date sorting
      if (this.sortColumn === 'createdDate') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

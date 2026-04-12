import { Component, inject, Input } from '@angular/core';
import { type Task } from '../task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: false,
  // imports: [CardComponent, DatePipe], //
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  private taskService = inject(TaskService);
  // @Output() complete = new EventEmitter<string>(); // No more needed with
  // the use of the service

  onCompleteTask() {
    // this.complete.emit(this.task.id);
    this.taskService.removeTask(this.task.id);
  }
}

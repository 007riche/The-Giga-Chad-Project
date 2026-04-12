import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  // enteredTitle!: string;
  // enteredSummary!: string;
  // enteredDate!: string;  // individual form property

  // or with signals
  // enteredTitle=signal('');
  // enteredSummary=signal('');
  // enteredDate=signal('');
  // with same angular 2-way binding of form fields "[(ngModel)]"

  @Input({ required: true }) userId!: string; // Needed by the tasksService

  @Output() close = new EventEmitter<void>();
  // @Output() cancel = new EventEmitter<void>();
  // @Output() add = new EventEmitter<NewTaskData>();
  enteredTask: NewTaskData = {
    title: '',
    summary: '',
    date: '',
  };
  private tasksService = inject(TaskService); // Inject a dependency using the the inject function from the
  // core of Angular

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    // this.add.emit(this.enteredTask);
    this.tasksService.addTask(this.enteredTask, this.userId);
    this.close.emit()
  }
}

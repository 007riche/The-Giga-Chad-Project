import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './task.model';
import { TaskService } from './tasks.service';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true })
  userName!: string;

  @Input({ required: true })
  selectedUserId!: string;

  isAddingTask = false;
  private taskService: TaskService;

constructor(taskService: TaskService) {
this.taskService = taskService;
}

// or 

// constructor(private taskService: TaskService) {}

  // Refactored into TasksService
  // tasks = dummyTasks;

  get selectedUserTasks() {
    // Refactored into TasksService
    // return this.tasks.filter((task) => task.userId===this.selectedUserId);
    return this.taskService.getUserTask(this.selectedUserId);
  }


  // Delegated to the "single" TaskComponent
  // onCompletedTask(id: string) {
  //   // this.tasks = this.tasks.filter((task) => task.id !== id);

  // }

  onStartAddingNewTask() {
    this.isAddingTask = true;
  }

  onCloseAddingNewTask() {
    this.isAddingTask = false;
  }

  // onCancelAddingNewTask() {
  //   this.isAddingTask = false;
  // }

  // onAddTask(taskData: NewTaskData) {
  //   // Refactored into TasksService

  //   // this.tasks.unshift({
  //   //   id: new Date().getTime().toString(),
  //   //   userId: this.selectedUserId,
  //   //   title: taskData.title,
  //   //   summary: taskData.summary,
  //   //   dueDate: taskData.date
  //   // });
  //   this.isAddingTask = false;
  // }
}

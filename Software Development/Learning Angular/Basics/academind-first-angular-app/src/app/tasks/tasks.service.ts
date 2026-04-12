import { Injectable } from '@angular/core';
import { dummyTasks } from './dummy-tasks';
import { NewTaskData } from './task.model';

@Injectable({ providedIn: 'root' }) // with only a single instance of this class in the entire application
export class TaskService {
  // without @Injectable,
  // No dependency injection delegation to angular.
  private tasks = dummyTasks;

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if(tasks) {
        this.tasks = JSON.parse(tasks);
    }
  }

  //
  private saveTasksOnLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getUserTask(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasksOnLocalStorage();
  }

  removeTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasksOnLocalStorage();
  }
}

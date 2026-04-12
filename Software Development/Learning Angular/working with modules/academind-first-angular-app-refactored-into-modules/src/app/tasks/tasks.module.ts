import { NgModule } from "@angular/core";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TaskComponent } from "./task/task.component";
import { TasksComponent } from "./tasks.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        TasksComponent,
        NewTaskComponent,
        TaskComponent,],
    exports: [TasksComponent],
    imports: [CommonModule, FormsModule, SharedModule],
})
export class TasksModule {}
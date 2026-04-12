import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
// import { TaskComponent } from './tasks/task/task.component';
import { BrowserModule } from '@angular/platform-browser';
// import { CardComponent } from './shared/card/card.component';
// import { NewTaskComponent } from './tasks/new-task/new-task.component';
// import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

// Because of the refactoring into module
// with change the way we bootstrap our application inside the main.ts file
@NgModule({
  //Both imports and declarations arrays usefull or as helper for big step to step migration
  // At the begining of the migration
  // imports: [BrowserModule, HeaderComponent, UserComponent, TaskComponent], // STANDALONE components list

  imports: [BrowserModule, SharedModule, TasksModule], // STANDALONE components
  //SharedModule can now be used by other entities suchas other modules or other components in other modules
  //
  // Browser module is the base module every angular app need in order to be able to run
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
   
  ], // Non-STANDALONE components
  bootstrap: [AppComponent], // Root components
})
export class AppModule {}

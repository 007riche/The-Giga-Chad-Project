import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic().bootstrapModule(AppModule); // inject our App module as the 
// starting module of the application .i.e Bootstraping the app with the module
// needs the specific root components to start (bootstrap array in the AppModule)

// Does not work
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

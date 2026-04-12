import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";

@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent], // Need of exporting them because 
    // they are used by other components in other module
})
export class SharedModule {}
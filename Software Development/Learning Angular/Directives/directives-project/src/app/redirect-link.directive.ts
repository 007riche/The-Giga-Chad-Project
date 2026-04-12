// This is an attribute directive
// It is added as attribute directive onto elements

import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: 'a[Redirect]',
    standalone: true,
    host: {
        '(click)': 'onCofirmRedirection($event)'
    },

})
export class RedirectLinkDriective {

    queryParam = input('external_app=Id19196161949849', {alias: 'Redirect'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log('Redirection is active');
    }

    onCofirmRedirection(event: MouseEvent) {
        // const address = (event.target as HTMLAnchorElement).href;
        const address = this.hostElementRef.nativeElement.href;
        const wantsRedirection = window.confirm("Do you want to go to "+address+" ?");

        if(wantsRedirection) {
            this.hostElementRef.nativeElement.href = address + "?from=external_app=Id19196161949849"+this.queryParam();
            return;
        }

        event.preventDefault();
    }
}
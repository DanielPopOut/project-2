import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'app';
    public routerUrl: string;
    private eventFoundSubjectSubscription: Subscription;


    constructor(private router: Router, private eventService: EventService) {
        this.eventFoundSubjectSubscription = this.eventService.eventFoundSubject$.subscribe(success => {
            if (success) {
                this.showEvent();
            } else {
                this.eventNotFound();
            }
        });
    }

    ngOnInit() {
        this.routerUrl = this.router.url;
        setTimeout(() => {
            console.log(this.router.url);
        }, 300);
        console.log(window.location.href);

    }

    ngOnDestroy() {
        console.log('destroy');
        this.eventFoundSubjectSubscription.unsubscribe();
    }


    public showEvent(): void {
        this.router.navigate(['event', this.eventService.event._id, this.eventService.event.host_name]);
    }

    public eventNotFound(): void {
        console.log("event non trouvé");
    }

}


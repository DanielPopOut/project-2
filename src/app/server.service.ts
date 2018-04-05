import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HomeCookEvent } from './home-cook-event';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EventService } from "./event.service";
import { HomeCookCard } from './home-cook-card';

@Injectable()
export class ServerService {
    private baseUrl = 'http://localhost:3000/';
    private eventUrl = this.baseUrl + 'homecookEvent';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        }),
        observe: "response"
    };

    // let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });

    constructor(private http: HttpClient, private eventService: EventService) {
    }

    public addHomeCookEventRequest(homeCookEvent: HomeCookEvent): Observable<HttpResponse<string>> {
        return this.http.post<string>(
            this.eventUrl,
            homeCookEvent,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe(
                // retry(3), // retry a failed request up to 3 times
                // catchError(this.handleError)
            );
    }

    public getHomeCookEventRequest(homeCookEventId: string): Observable<HttpResponse<HomeCookEvent>> {
        return this.http.get<HomeCookEvent>(this.eventUrl + '/' + homeCookEventId,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe(
                // retry(3), // retry a failed request up to 3 times
                // catchError(this.handleError)
            );
    }

    public deleteHomeCookEventRequest(homeCookEventId: string): Observable<HttpResponse<HomeCookEvent>> {
        return this.http.delete<HomeCookEvent>(this.eventUrl + '/' + homeCookEventId,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
    }

    public addHomeCookEvent(homeCookEvent: HomeCookEvent): void {
        this.addHomeCookEventRequest(homeCookEvent).subscribe(response => {
            if (response.status === 200) {
                homeCookEvent._id = response.body
            }
        });
    }

    public getHomeCookEvent(homeCookEventId: string): void {
        this.getHomeCookEventRequest(homeCookEventId).subscribe(response => {
            if (response.status === 200) {
                this.eventService.event = response.body
            }
        });
    }


    public addHomeCookCardRequest(homeCookCard: HomeCookCard): Observable<HttpResponse<string>> {
        return this.http.post<string>(
            this.eventUrl,
            homeCookCard,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe(
                // retry(3), // retry a failed request up to 3 times
                // catchError(this.handleError)
            );
    }

    public addHomeCookCard(homeCookCard: HomeCookCard): void {
        this.addHomeCookCardRequest(homeCookCard).subscribe(response => {
            if (response.status === 200) {
                homeCookCard._id = response.body
            }
        });
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}

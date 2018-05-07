import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HomeCookEvent } from './home-cook-event';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HomeCookCard } from './home-cook-card';
import { CardElement } from './card-element';
import { Voter } from './voter';

@Injectable()
export class ServerService {
    private baseUrl = 'http://localhost:3000/api/';
    private homecookEventUrl = this.baseUrl + 'homecookEvent';
    private homecookCardUrl = this.baseUrl + 'homecookCard';
    private cardElementUrl = this.baseUrl + 'cardElement';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        }),
        observe: "response"
    };

    // let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });

    constructor(private http: HttpClient) {
    }

    //***********************************************************
    //HomeCookEventRequest :
    //***********************************************************


    public addHomeCookEventRequest(homeCookEvent: HomeCookEvent): Observable<HttpResponse<string>> {
        return this.http.post<string>(
            this.homecookEventUrl,
            homeCookEvent,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public getHomeCookEventRequest(homeCookEventIdAndHostName: string): Observable<HttpResponse<HomeCookEvent>> {
        return this.http.get<HomeCookEvent>(this.homecookEventUrl + '/' + homeCookEventIdAndHostName,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public deleteHomeCookEventRequest(homeCookEventId: string): Observable<HttpResponse<HomeCookEvent>> {
        return this.http.delete<HomeCookEvent>(this.homecookEventUrl + '/' + homeCookEventId,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
    }

    public getAllHomeCookEventRequest(password: string): Observable<HttpResponse<HomeCookEvent>> {
        return this.http.post<HomeCookEvent>(this.homecookEventUrl + '/all',
            {password: password},
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public addHomeCookGuestRequest(homeCookEventId: string, guestName: string): Observable<HttpResponse<string>> {
        return this.http.post<string>(
            this.homecookEventUrl + '/' + homeCookEventId + '/guest',
            {guests: guestName},
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }


    //***********************************************************
    //HomeCookCardRequests :
    //***********************************************************

    public addHomeCookCardRequest(homeCookCard: HomeCookCard): Observable<HttpResponse<string>> {
        return this.http.post<string>(
            this.homecookCardUrl,
            homeCookCard,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public getHomeCookCardsWithEventIdRequest(eventId: string): Observable<HttpResponse<HomeCookCard[]>> {
        return this.http.post<HomeCookCard[]>(
            this.homecookCardUrl + '/filter',
            {event_id: eventId},
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public deleteHomeCookCardRequest(homeCookEventId: string): Observable<HttpResponse<HomeCookCard>> {
        return this.http.delete<HomeCookCard>(this.homecookCardUrl + '/' + homeCookEventId,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
    }

    //***********************************************************
    //HomeCookCardElement Requests
    //***********************************************************


    public addCardElementRequest(cardElement: CardElement): Observable<HttpResponse<string>> {
        return this.http.post<string>(
            this.cardElementUrl,
            cardElement,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public getCardsElementWithEventIdRequest(eventId: string): Observable<HttpResponse<CardElement[]>> {
        return this.http.post<CardElement[]>(
            this.cardElementUrl + '/filter',
            {event_id: eventId},
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public voteCardElementRequest(cardElement: CardElement, voterData: Voter): Observable<HttpResponse<CardElement>> {
        return this.http.post<CardElement>(
            this.cardElementUrl + '/vote/'+ cardElement._id + '/' + voterData.name,
            voterData,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
            .pipe();
    }

    public deleteCardElementRequest(cardElementId: string): Observable<HttpResponse<CardElement>> {
        return this.http.delete<CardElement>(this.cardElementUrl + '/' + cardElementId,
            {
                headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'}),
                observe: "response"
            })
    }


    //***********************************************************
    //*******************   Autre   *********************
    //***********************************************************


    /*public getTest(): Observable<HttpResponse<string>> {
        return this.http.get<string>("http://localhost:4200",
            {
                headers: new HttpHeaders({'Content-Type': 'text/html', 'Authorization': 'my-auth-token'}),
                responseType: 'text'
            })
            .pipe();
    }*/

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

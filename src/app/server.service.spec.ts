import { inject, TestBed } from '@angular/core/testing';

import { ServerService } from './server.service';
import { HomeCookCard } from './home-cook-card';
import { HttpClientModule } from '@angular/common/http';


describe('ServerService', () => {
    let service: ServerService;
    let fakeEvent = {
        id: null,
        host_name: "Daniel",
        name: "Soirée sushis",
        place: "2223 rue saint antoine",
        date: "2018-03-30T12:42",
        mail: "dnaioeno@gmail.com",
        description: "Ce sera du lourd !!!",
        guests: ['Maxime', 'Amandine', 'Prunelle', 'Theo', 'Ash'],
        cards: [new HomeCookCard("0", "Entrée", 0), new HomeCookCard('1', "Plat", 1), new HomeCookCard('2', "Boissons", 2)]
    };


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ServerService],
            imports: [
                HttpClientModule
            ]
        });
        service = TestBed.get(ServerService);
    });

    it('should be created', inject([ServerService], (service: ServerService) => {
        expect(service).toBeTruthy();
    }));


    it('should add element to database ', (done) => {
        service.addHomeCookEventRequest(fakeEvent).subscribe(data => {
                fakeEvent.id = data;
                done();
            }
        );
    });


    it('should retrieve element to database ', () => {
        console.log("fakeEventId ", fakeEvent.id);
        service.getHomeCookEventRequest(fakeEvent.id).subscribe(
            eventFound => expect(eventFound).not.toBe(null),
            error => console.log(error.status)
        );
    });

    it('should delete element to database ', (done) => {
        service.deleteHomeCookEventRequest(fakeEvent.id).subscribe(res => {
                expect(res.ok).toBe(1);
            }
        );
        setTimeout(() => {
            done();
        }, 500);
    });

    it('should not retrieve the element anymore ', (done) => {
        service.getHomeCookEventRequest(fakeEvent.id).subscribe(eventFound => {
                expect(eventFound).toBe(null);
                done();
            }
        );
    });

});


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewEventComponent } from './new-event/new-event.component';
import { CardElementComponent } from './card-element/card-element.component';
import { EventComponent } from './event/event.component';
import { CardElementDetailsComponent } from './card-element-details/card-element-details.component';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'newevent', component: NewEventComponent},
    // {path: 'event', component: EventComponent},
    {path: 'event/:id/:hostname', component: EventComponent},
    {path: 'card', component: CardElementComponent},
    {path: 'card-details', component: CardElementDetailsComponent},
    {path: 'test', component: TestComponent},
    {path: 'error', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

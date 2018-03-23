import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewEventComponent } from './new-event/new-event.component';
import { CardElementComponent } from './card-element/card-element.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'newevent', component: NewEventComponent},
  {path: 'card', component: CardElementComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

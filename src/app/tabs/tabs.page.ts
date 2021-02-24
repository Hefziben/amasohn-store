import { Component } from '@angular/core';
import { EventService } from '../services/event-service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
language:string;
  constructor(
    public eventService:EventService
  ) {
    this.eventService.currentEvent.subscribe(data =>{
      if (data) {
        this.language = data.language
        
      }
    })  }

}

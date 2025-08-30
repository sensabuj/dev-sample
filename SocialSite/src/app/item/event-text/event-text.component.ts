import { Component, OnInit } from '@angular/core';
import { EventClient } from 'src/app/shared/event-api';

@Component({
  selector: 'app-event-text',
  templateUrl: './event-text.component.html',
  styleUrls: ['./event-text.component.css']
})
export class EventTextComponent implements OnInit {

  culturalDaysVm: CulturalDaysViewModel;

  constructor(client: EventClient) {
    client.GetCulturalDays().subscribe(result => {
      this.culturalDaysVm = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface CulturalDaysViewModel {
  culturalDayId: number;
  title: string;
  eventOn: string;
  location: string;
  majorReligion: string;
  note: string;
  shortNote: string;
  imageLink: string;
  postLink: string;
}

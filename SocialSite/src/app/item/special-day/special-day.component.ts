import { Component, OnInit } from '@angular/core';
import { EventClient } from 'src/app/shared/event-api';

@Component({
  selector: 'app-special-day',
  templateUrl: './special-day.component.html',
  styleUrls: ['./special-day.component.css']
})
export class SpecialDayComponent implements OnInit {

  specialDaysVm: SpecialDaysViewModel;

  constructor(client: EventClient) {
    client.GetSpecialDays().subscribe(result => {
      this.specialDaysVm = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface SpecialDaysViewModel {
  specialDayId: number;
  title: string;
  eventOn: string;
  eventType: string;
  note: string;
  shortNote: string;
  imageLink: string;
  postLink: string;
}


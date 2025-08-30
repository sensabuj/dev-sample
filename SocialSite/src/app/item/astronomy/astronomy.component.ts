import { Component, OnInit } from '@angular/core';
import { EventClient } from 'src/app/shared/event-api';

@Component({
  selector: 'app-astronomy',
  templateUrl: './astronomy.component.html',
  styleUrls: ['./astronomy.component.css']
})
export class AstronomyComponent implements OnInit {

  astronomyDaysVm: AstronomyDaysViewModel;

  constructor(client: EventClient) {
    client.GetAstronomyDays().subscribe(result => {
      this.astronomyDaysVm = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface AstronomyDaysViewModel {
  astronomyDayId: number;
  title: string;
  eventOn: string;
  note: string;
  shortNote: string;
  imageLink: string;
  postLink: string;
}

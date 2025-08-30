import { Component, OnInit } from '@angular/core';
import { EventClient } from 'src/app/shared/event-api';

@Component({
  selector: 'app-birthday-text',
  templateUrl: './birthday-text.component.html',
  styleUrls: ['./birthday-text.component.css']
})
export class BirthdayTextComponent implements OnInit {

  brthCeremonyDaysVm: BirthCeremonyDaysViewModel;

  constructor(client: EventClient) {
    client.GetBirthCeremonyDays().subscribe(result => {
      this.brthCeremonyDaysVm = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }

}
interface BirthCeremonyDaysViewModel {
  birthCeremonyDayId: number;
  name: string;
  eventOn: string;
  place: string;
  event: string;
  category: string;
  note: string;
  shortNote: string;
  imageLink: string;
  postLink: string;
}
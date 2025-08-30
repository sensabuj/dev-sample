import { Component, OnInit } from '@angular/core';
import { EventClient } from 'src/app/shared/event-api';


@Component({
  selector: 'app-fair',
  templateUrl: './fair.component.html',
  styleUrls: ['./fair.component.css']
})
export class FairComponent implements OnInit {

  fairsVm: FairsViewModel;

  constructor(client: EventClient) {
    client.GetFairs().subscribe(result => {
      this.fairsVm = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface FairsViewModel {
  fairId: number;
  title: string;
  eventOn: string;
  location: string;
  duration: number;
  note: string;
  shortNote: string;
  imageLink: string;
  postLink: string;
}
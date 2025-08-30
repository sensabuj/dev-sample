import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SocialSiteClient, SocialSiteListViewModel } from '../shared/social-api';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  socialSiteListVm: SocialSiteListViewModel[];

  constructor(client: SocialSiteClient) {
    client.getAll().subscribe(result => {
      this.socialSiteListVm = result;
    }, error => console.error(error));
  }
  ngOnInit() {
  }

}

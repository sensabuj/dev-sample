import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  reason = '';
  title = 'SocialSite';
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}

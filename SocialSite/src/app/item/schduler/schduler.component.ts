import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleTextClient } from 'src/app/shared/sample-text-api';
import { SocialSiteClient, SocialSiteListViewModel } from 'src/app/shared/social-api';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-schduler',
  templateUrl: './schduler.component.html',
  styleUrls: ['./schduler.component.css']
})
export class SchdulerComponent implements OnInit {
  schduleForm: FormGroup;
  copyLinkForm: FormGroup;
  sampleTextVM: SampleTextViewModel;
  socialSiteListVm: SocialSiteListViewModel[];

  // tslint:disable-next-line:max-line-length
  timeOptions: string[] = ['00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45', '24:00'];

  @Input() link: string;
  @Input() title: string;
  @Input() category: string;
  @Input() fromPostId: number;

  constructor(client: SampleTextClient, clientSocial: SocialSiteClient, private http: Http) {
    client.getsampletexts().subscribe(result => {
      this.sampleTextVM = result;
    }, error => console.error(error));

    clientSocial.getFilter().subscribe(result => {
      this.socialSiteListVm = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.initschduleForm();
    this.initCopyLinkForm();
  }

  private initschduleForm() {
    let schduledate;
    let schduletime;
    let socialsites;

    this.schduleForm = new FormGroup({
      'schduleTextFull': new FormControl(),
      'sampleTextId': new FormControl(),
      'category': new FormControl(this.category),
      'fromPostId': new FormControl(this.fromPostId),
      'schduledate': new FormControl(schduledate, Validators.required),
      'schduletime': new FormControl(schduletime, Validators.required),
      'socialsites': new FormControl(socialsites, Validators.required)
    });
  }
  private initCopyLinkForm() {
    let sampleTextLst;
    let sampleTextFull;
    let headerchecked;
    this.copyLinkForm = new FormGroup({
      'sampleTextLst': new FormControl(sampleTextLst),
      'sampleTextFull': new FormControl(sampleTextFull),
      'headerchecked': new FormControl(headerchecked)
    });
  }
  private onSchduleClick() {
    const schduleData = this.schduleForm.value;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(schduleData);
    const url_ = 'http://localhost:63556/api/Schdule/Create';
    const postItemURL = url_;
    this.http.post(postItemURL, body, { headers: headers })
      .subscribe(
        (returnId) => {
          this.schduleForm.reset();
          this.copyLinkForm.reset();
        });
  }


  private onClick() {
    // tslint:disable-next-line:max-line-length
    const sampleTextId = this.copyLinkForm.controls['sampleTextLst'].value == null ? -1 : this.copyLinkForm.controls['sampleTextLst'].value.sampleTextId;;
    const isChecked = this.copyLinkForm.controls['headerchecked'].value;
    // tslint:disable-next-line:max-line-length
    const lstValue = this.copyLinkForm.controls['sampleTextLst'].value == null ? 'none' : this.copyLinkForm.controls['sampleTextLst'].value.sampleTextFull;

    const setText = this.SetText(isChecked, lstValue);
    this.copyLinkForm.controls['sampleTextFull'].setValue(setText);
    this.schduleForm.controls['schduleTextFull'].setValue(setText);
    this.schduleForm.controls['sampleTextId'].setValue(sampleTextId);

  }
  private SetText(isChecked, lstValue): string {
    let fullText = '';
    const lnk = 'https://youtu.be/' + this.link;
    if (isChecked) {
      if (lstValue !== 'none') {
        fullText = this.title + '\n' + lstValue + '\n' + lnk;
      } else {
        fullText = this.title + '\n' + lnk;
      }
    } else {
      if (lstValue !== 'none') {
        fullText = lstValue + '\n' + lnk;
      } else {
        fullText = lnk;
      }
    }
    this.CopyToClipboard(fullText);
    return fullText;
  }
  CopyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}

interface SampleTextViewModel {
  sampleTextId: number;
  sampleTextFull: string;
  category: string;
  priority: number;
  frequency: number;
}

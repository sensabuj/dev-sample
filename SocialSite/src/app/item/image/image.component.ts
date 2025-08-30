import { Component, OnInit } from '@angular/core';
import { ImagePublishedClient } from 'src/app/shared/image-api';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  imagePublishedVm: ImagePublishedViewModel;

  constructor(client: ImagePublishedClient) {
    client.getImagePublisheds().subscribe(result => {
      this.imagePublishedVm = result;

    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface ImagePublishedViewModel {
  imagePublishedId: number;
  publishImageId: number;
  caption: string;
  descripsion: string;
  tags: string;
  name: string;
  publishPathLocal: string;
  createdOn: string;
  updatedOn: string;
  postLink: string;
  isActive: boolean;
}

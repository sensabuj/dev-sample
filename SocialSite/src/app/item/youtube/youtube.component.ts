import { Component, OnInit, Input } from '@angular/core';
import { YouTubeChannelClient, YouTubeVideoClient } from 'src/app/shared/youtube-channel';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  youTubeChannelVm: YouTubeChannelViewModel;
  YouTubeVideoVm: YouTubeVideoViewModel;



  constructor(client: YouTubeChannelClient, vidclient: YouTubeVideoClient) {
    client.getchannel().subscribe(result => {
      this.youTubeChannelVm = result;

    }, error => console.error(error));

    vidclient.getvideos().subscribe(result => {
      this.YouTubeVideoVm = result;

    }, error => console.error(error));

  }

  ngOnInit() {
  }

}

interface YouTubeChannelViewModel {
  youTubeChannelId: number;
  title: string;
  subscriberCount: number;
  channelId: string;
  videoCount: number;
  viewCount: number;
  lastUpdatedOn: string;
}


interface YouTubeVideoViewModel {
  youTubeVideoId: number;
  viewCount: number;
  videoId: string;
  uploadTime: string;
  title: string;
  thumbnail: string;
  link: string;
  likeCount: number;
  lastUpdatedOn: string;
  favoriteCount: number;
  duration: string;
  dislikeCount: number;
  descripsion: string;
  commentCount: number;
  ranking: number;
}

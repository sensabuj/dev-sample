import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Injectable, Optional, Inject } from '@angular/core';

export const API_BASE_URL = 'http://localhost:63556/';

export interface IYouTubeChannelClient {
    getchannel(): Observable<YouTubeChannelViewModel | null>;
}

export interface IYouTubeVideoClient {
    getvideos(): Observable<YouTubeVideoViewModel | null>;
}

@Injectable()
export class YouTubeChannelClient implements IYouTubeChannelClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }
    getchannel(): Observable<YouTubeChannelViewModel> {
        const url_ = 'http://localhost:63556/api/VideoChannel/GetYouTubeChannelPreview';
        return this.http.get<YouTubeChannelViewModel>(url_);

    }

}


@Injectable()
export class YouTubeVideoClient implements IYouTubeVideoClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }
    getvideos(): Observable<YouTubeVideoViewModel> {
        const url_ = 'http://localhost:63556/api/VideoChannel/GetYouTubeVideoPreview';
        return this.http.get<YouTubeVideoViewModel>(url_);

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

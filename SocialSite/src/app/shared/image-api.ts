import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Injectable, Optional, Inject } from '@angular/core';

export const API_BASE_URL = 'http://localhost:63556/';

export interface IImagePublishedClient {
    getImagePublisheds(): Observable<ImagePublishedViewModel | null>;
}



@Injectable()
export class ImagePublishedClient implements IImagePublishedClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }
    getImagePublisheds(): Observable<ImagePublishedViewModel> {
        const url_ = 'http://localhost:63556/api/Image/GetImagePublisheds';
        return this.http.get<ImagePublishedViewModel>(url_);

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



import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Injectable, Optional, Inject } from '@angular/core';

export const API_BASE_URL = 'http://localhost:63556/';

export interface IBackLinkClient {
    getBacklinks(): Observable<BackLinkViewModel | null>;
}



@Injectable()
export class BackLinkClient implements IBackLinkClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }
    getBacklinks(): Observable<BackLinkViewModel> {
        const url_ = 'http://localhost:63556/api/BackLink/GetBacklinks';
        return this.http.get<BackLinkViewModel>(url_);

    }

}


interface BackLinkViewModel {
    backLinkId: number;
    backlink: string;
    name: string;
    category: string;
    postCount: number;
    orders: number;
    area: string;
    isActive: boolean;
    updatedOn: string;
}
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Injectable, Optional, Inject } from '@angular/core';

export const API_BASE_URL = 'http://localhost:63556/';

export interface ISampleTextClient {
    getsampletexts(): Observable<SampleTextViewModel | null>;
}



@Injectable()
export class SampleTextClient implements ISampleTextClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }
    getsampletexts(): Observable<SampleTextViewModel> {
        const url_ = 'http://localhost:63556/api/SampleText/GetSampleTextPreview';
        return this.http.get<SampleTextViewModel>(url_);

    }

}





interface SampleTextViewModel {
    sampleTextId: number;
    sampleTextFull: string;
    category: string;
    priority: number;
    frequency: number;
  }



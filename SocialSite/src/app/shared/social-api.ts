import { mergeMap as _observableMergeMap, catchError as _observableCatch, catchError } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';

export const API_BASE_URL = 'http://localhost:63556/'; // new InjectionToken<string>('API_BASE_URL');

export interface ISocialSiteClient {
    getAll(): Observable<SocialSiteListViewModel[] | null>;
    get(id: number): Observable<SocialSiteViewModel | null>;
    getFilter(): Observable<SocialSiteListViewModel[] | null>;
}

@Injectable()
export class SocialSiteClient implements ISocialSiteClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }
    getAll(): Observable<SocialSiteListViewModel[]> {
        const url_ = 'http://localhost:63556/api/SocialSite/GetSocialSitePreview';
        return this.http.get<SocialSiteListViewModel[]>(url_);
    }
    getFilter(): Observable<SocialSiteListViewModel[]> {
        const url_ = 'http://localhost:63556/api/SocialSite/GetSocialSiteFilterPreview';
        return this.http.get<SocialSiteListViewModel[]>(url_);
    }

    get(id: number): Observable<SocialSiteViewModel | null> {
        let url_ = this.baseUrl + '/api/Products/Get/{id}';
        if (id === undefined || id === null) {
            throw new Error('The parameter \'id\' must be defined.');
        }
        url_ = url_.replace('{id}', encodeURIComponent('' + id));
        url_ = url_.replace(/[?&]$/, '');

        const options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<SocialSiteViewModel | null>><any>_observableThrow(e);
                }
            } else {
                return <Observable<SocialSiteViewModel | null>><any>_observableThrow(response_);
            }
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<SocialSiteViewModel | null> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        // tslint:disable-next-line:max-line-length
        const _headers: any = {}; if (response.headers) { for (const key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? SocialSiteViewModel.fromJS(resultData200) : <any>null;
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf<SocialSiteViewModel | null>(<any>null);
    }


}

export class SocialSiteListViewModel implements ISocialSiteListViewModel {

    constructor(data?: ISocialSiteListViewModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
    products?: SocialSiteDto[] | undefined;
    createEnabled!: boolean;

    static fromJS(data: any): SocialSiteListViewModel {
        data = typeof data === 'object' ? data : {};
        const result = new SocialSiteListViewModel();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            if (data['products'] && data['products'].constructor === Array) {
                this.products = [];
                for (const item of data['products']) {
                    this.products.push(SocialSiteDto.fromJS(item));
                }
            }
            this.createEnabled = data['createEnabled'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.products && this.products.constructor === Array) {
            data['products'] = [];
            for (const item of this.products) {
                data['products'].push(item.toJSON());
            }
        }
        data['createEnabled'] = this.createEnabled;
        return data;
    }
}

export interface ISocialSiteListViewModel {
    products?: SocialSiteDto[] | undefined;
    createEnabled: boolean;
}

export class SocialSiteDto implements IProductDto {


    constructor(data?: IProductDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
    socialSiteId!: number;
    name?: string | undefined;
    link?: string | undefined;
    category?: string | undefined;
    isAutoPostEnable?: boolean | undefined;

    static fromJS(data: any): SocialSiteDto {
        data = typeof data === 'object' ? data : {};
        const result = new SocialSiteDto();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.socialSiteId = data['productId'];
            this.name = data['name'];
            this.link = data['link'];
            this.category = data['category'];
            this.isAutoPostEnable = data['isAutoPostEnable'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['socialSiteId'] = this.socialSiteId;
        data['name'] = this.name;
        data['link'] = this.link;
        data['category'] = this.category;
        this.isAutoPostEnable = data['isAutoPostEnable'];
        return data;
    }
}

export interface IProductDto {
    socialSiteId: number;
    name?: string | undefined;
    link?: string | undefined;
    category?: string | undefined;
    isAutoPostEnable?: boolean | undefined;
}

export class SocialSiteViewModel implements IProductViewModel {


    constructor(data?: IProductViewModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
    socialSiteId!: number;
    name?: string | undefined;
    link?: string | undefined;
    category?: string | undefined;
    isAutoPostEnable?: boolean | undefined;

    static fromJS(data: any): SocialSiteViewModel {
        data = typeof data === 'object' ? data : {};
        const result = new SocialSiteViewModel();
        result.init(data);
        return result;
    }

    init(data?: any) {
        if (data) {
            this.socialSiteId = data['socialSiteId'];
            this.name = data['name'];
            this.link = data['link'];
            this.category = data['category'];
            this.isAutoPostEnable = data['isAutoPostEnable'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['socialSiteId'] = this.socialSiteId;
        data['name'] = this.name;
        data['link'] = this.link;
        data['category'] = this.category;
        data['isAutoPostEnable'] = this.isAutoPostEnable;
        return data;
    }
}

export interface IProductViewModel {
    socialSiteId: number;
    name?: string | undefined;
    link?: string | undefined;
    category?: string | undefined;
    isAutoPostEnable?: boolean | undefined;
}

// tslint:disable-next-line:max-line-length
function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined) {
        return _observableThrow(result);
    } else {
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
    }
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next('');
            observer.complete();
        } else {
            const reader = new FileReader();
            reader.onload = function () {
                observer.next(this.result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}

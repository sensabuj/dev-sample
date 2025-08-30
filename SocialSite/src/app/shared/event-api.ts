import { Observable } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_BASE_URL = 'http://localhost:63556/';

export interface IEventClient {
    GetAstronomyDays(): Observable<AstronomyDaysViewModel | null>;
    GetBirthCeremonyDays(): Observable<BirthCeremonyDaysViewModel | null>;
    GetCulturalDays(): Observable<CulturalDaysViewModel | null>;
    GetFairs(): Observable<FairsViewModel | null>;
    GetSpecialDays(): Observable<SpecialDaysViewModel | null>;
}

@Injectable()
export class EventClient implements IEventClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : '';
    }
    GetAstronomyDays(): Observable<AstronomyDaysViewModel> {
        const url_ = 'http://localhost:63556/api/Event/GetAstronomyDays';
        return this.http.get<AstronomyDaysViewModel>(url_);
    }
    GetBirthCeremonyDays(): Observable<BirthCeremonyDaysViewModel> {
        const url_ = 'http://localhost:63556/api/Event/GetBirthCeremonyDays';
        return this.http.get<BirthCeremonyDaysViewModel>(url_);
    }
    GetCulturalDays(): Observable<CulturalDaysViewModel> {
        const url_ = 'http://localhost:63556/api/Event/GetCulturalDays';
        return this.http.get<CulturalDaysViewModel>(url_);
    }
    GetFairs(): Observable<FairsViewModel> {
        const url_ = 'http://localhost:63556/api/Event/GetFairs';
        return this.http.get<FairsViewModel>(url_);
    }
    GetSpecialDays(): Observable<SpecialDaysViewModel> {
        const url_ = 'http://localhost:63556/api/Event/GetSpecialDays';
        return this.http.get<SpecialDaysViewModel>(url_);
    }

}

interface AstronomyDaysViewModel {
    astronomyDayId: number;
    title: string;
    eventOn: string;
    note: string;
    shortNote: string;
    imageLink: string;
    postLink: string;
}

interface BirthCeremonyDaysViewModel {
    birthCeremonyDayId: number;
    name: string;
    eventOn: string;
    place: string;
    event: string;
    category: string;
    note: string;
    shortNote: string;
    imageLink: string;
    postLink: string;
}

interface CulturalDaysViewModel {
    culturalDayId: number;
    title: string;
    eventOn: string;
    location: string;
    majorReligion: string;
    note: string;
    shortNote: string;
    imageLink: string;
    postLink: string;
}

interface FairsViewModel {
    fairId: number;
    title: string;
    eventOn: string;
    location: string;
    duration: number;
    note: string;
    shortNote: string;
    imageLink: string;
    postLink: string;
}

interface SpecialDaysViewModel {
    specialDayId: number;
    title: string;
    eventOn: string;
    eventType: string;
    note: string;
    shortNote: string;
    imageLink: string;
    postLink: string;
}

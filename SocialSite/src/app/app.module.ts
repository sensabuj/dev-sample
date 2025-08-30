import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatListModule, MatButtonModule, MatDialogModule, MatAutocompleteModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatChipsModule, MatGridListModule, MatSidenavModule, MatExpansionModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatSelectModule, MatFormFieldControl } from '@angular/material';

import { PublishComponent } from './publish/publish.component';
import { ItemComponent } from './item/item.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SocialSiteClient } from './shared/social-api';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeComponent } from './item/youtube/youtube.component';
import { BirthdayTextComponent } from './item/birthday-text/birthday-text.component';
import { EventTextComponent } from './item/event-text/event-text.component';
import { ImageComponent } from './item/image/image.component';
import { YouTubeChannelClient, YouTubeVideoClient } from './shared/youtube-channel';
import { SchdulerComponent } from './item/schduler/schduler.component';
import { SampleTextClient } from './shared/sample-text-api';
import { FieldComponent } from './field.component';

import { MomentModule } from 'angular2-moment';
import { RoundPipe } from './shared/round.pipe';
import { AstronomyComponent } from './item/astronomy/astronomy.component';
import { FairComponent } from './item/fair/fair.component';
import { SpecialDayComponent } from './item/special-day/special-day.component';
import { EventClient } from './shared/event-api';
import { ImagePublishedClient } from './shared/image-api';

const appRoutes: Routes = [
  { path: 'publish', component: PublishComponent },
  {
    path: '',
    redirectTo: '/publish',
    pathMatch: 'full'
  },
  {
    path: 'item',
    component: ItemComponent,
    children: [
      { path: '', redirectTo: 'youtube', pathMatch: 'full' },
      { path: 'youtube', component: YoutubeComponent },
      { path: 'birth-day', component: BirthdayTextComponent },
      { path: 'event-text', component: EventTextComponent },
      { path: 'astronomy', component: AstronomyComponent },
      { path: 'fair', component: FairComponent },
      { path: 'specialday', component: SpecialDayComponent },
      { path: 'image', component: ImageComponent }
    ]
  },
  { path: 'analysis', component: AnalysisComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PublishComponent,
    ItemComponent,
    AnalysisComponent,
    PageNotFoundComponent,
    YoutubeComponent,
    BirthdayTextComponent,
    EventTextComponent,
    ImageComponent,
    SchdulerComponent,
    FieldComponent,
    RoundPipe,
    AstronomyComponent,
    FairComponent,
    SpecialDayComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatChipsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MomentModule
  ],
  providers: [SocialSiteClient, YouTubeChannelClient, YouTubeVideoClient, SampleTextClient, EventClient,ImagePublishedClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

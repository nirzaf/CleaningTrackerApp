import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessagingService } from './services/messaging.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [MessagingService]
})
export class AppModule { }

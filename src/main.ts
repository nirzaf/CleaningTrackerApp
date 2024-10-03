import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';
import { Messaging } from '@angular/fire/messaging';
import { MessagingService } from './app/services/messaging.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    importProvidersFrom(Messaging),
    MessagingService
  ]
}).catch(err => console.error(err));

import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);

  constructor(private messaging: Messaging) {}

  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.getToken();
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  getToken() {
    getToken(this.messaging).then(
      (currentToken: string | null) => {
        if (currentToken) {
          console.log('Token received', currentToken);
          this.receiveMessage();
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }
    ).catch((err: Error) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  receiveMessage() {
    onMessage(this.messaging, (payload: any) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  subscribeToTopic(topic: string) {
    // Note: Subscribing to topics is typically done on the server-side
    console.log(`Subscribing to topic: ${topic}`);
  }
}
import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CleaningTrackerApp';

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messagingService.requestPermission();
    // Note: subscribing to topics is typically done server-side
    // this.messagingService.subscribeToTopic('wash_reminders');
  }
}

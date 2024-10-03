import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WashSession } from '../models/wash-session.model';

@Injectable({
  providedIn: 'root'
})
export class WashService {
  constructor(private firestore: Firestore) {}

  getWashSessions(): Observable<WashSession[]> {
    const washSessionsCollection = collection(this.firestore, 'washSessions');
    return collectionData(washSessionsCollection, { idField: 'id' }) as Observable<WashSession[]>;
  }

  logWashSession(washSession: WashSession): Promise<any> {
    const washSessionsCollection = collection(this.firestore, 'washSessions');
    return addDoc(washSessionsCollection, washSession);
  }

  updateWashSessionStatus(id: string, status: 'completed' | 'missed'): Promise<void> {
    const washSessionDoc = doc(this.firestore, `washSessions/${id}`);
    return updateDoc(washSessionDoc, { status });
  }
}
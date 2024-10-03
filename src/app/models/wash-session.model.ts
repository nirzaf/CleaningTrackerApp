export interface WashSession {
  id?: string;
  date: Date;
  status: 'completed' | 'missed';
}
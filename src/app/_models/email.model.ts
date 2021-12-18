import {ContactModel} from './contact.model';

export interface EmailModel {
  id: string;
  eventId: number;
  recipient: ContactModel;
  subject: string;
}

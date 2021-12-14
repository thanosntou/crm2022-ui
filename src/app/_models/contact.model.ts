import {CountryModel} from './country.model';

export interface ContactModel {
  id: number;
  company: string;
  name: string;
  surname: string;
  website: string;
  country: CountryModel;
  skype: string;
  viber: number;
  whatsApp: number;
  weChat: string;
  linkedIn: string;
  businessType: string;
  comments: string;
}

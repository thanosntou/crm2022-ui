import {CountryModel} from './country.model';

export interface ContactModel {
  id: number;
  company: string;
  name: string;
  surname: string;
  country: CountryModel;
  website: string;
  skype: string;
  viber: string;
  whatsApp: string;
  weChat: string;
  linkedIn: string;
  businessType: string;
  comments: string;
}

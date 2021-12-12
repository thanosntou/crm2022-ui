import {Component, OnInit} from '@angular/core';
import {ContactModel} from '../_models/contact.model';
import {Router} from '@angular/router';
import {ContactService} from '../_services/contact.service';
import {faSortAlphaDown, faSortAlphaUp} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup} from '@angular/forms';
import {CountryModel} from '../_models/country.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: ContactModel[] = [];
  countries: CountryModel[] = [];
  businessTypes: string[] = [];
  newContactForm: FormGroup;
  sortByCompanyIcon = faSortAlphaDown;

  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnInit() {
    this.contactService.getAll().subscribe(response => {
      this.contacts = response;
    });
    this.contactService.getSupportedCountries().subscribe(response => {
      this.countries = response;
    });
    this.contactService.getSupportedBusinessTypes().subscribe(response => {
      this.businessTypes = response;
    });
    this.newContactForm = new FormGroup({
      'contactData': new FormGroup({
        'company': new FormControl(null),
        'name': new FormControl(null),
        'surname': new FormControl(null),
        'country': new FormControl(null),
        'website': new FormControl(null),
        'skype': new FormControl(null),
        'viber': new FormControl(null),
        'whatsApp': new FormControl(null),
        'weChat': new FormControl(null),
        'linkedIn': new FormControl(null),
        'businessType': new FormControl(null),
        'comments': new FormControl(null)
      })
    });
  }

  onSaveContact() {
    const contact: ContactModel = this.newContactForm.get('contactData').value;
    this.contactService.create(contact).subscribe((result) => {
      this.contacts.push(result);
      this.newContactForm.get('contactData').get('company').reset();
      this.newContactForm.get('contactData').get('name').reset();
      this.newContactForm.get('contactData').get('surname').reset();
      this.newContactForm.get('contactData').get('country').reset();
      this.newContactForm.get('contactData').get('website').reset();
      this.newContactForm.get('contactData').get('skype').reset();
      this.newContactForm.get('contactData').get('viber').reset();
      this.newContactForm.get('contactData').get('whatsApp').reset();
      this.newContactForm.get('contactData').get('weChat').reset();
      this.newContactForm.get('contactData').get('linkedIn').reset();
      this.newContactForm.get('contactData').get('businessType').reset();
      this.newContactForm.get('contactData').get('comments').reset();
    });
  }

  onDelete(contact: ContactModel) {
    this.contactService.delete(contact.id).subscribe(
      () => this.contactService.getAll().subscribe(response => this.contacts = response),
      error => console.log(JSON.stringify(error))
    );
  }

  onSelect(contact: ContactModel) {
    this.router.navigate(['/contact', contact.id]);
  }

  sortByCompany() {
    if (this.sortByCompanyIcon === faSortAlphaDown) {
      this.sortByCompanyIcon = faSortAlphaUp;
      this.contacts.sort((a, b) =>
        a.company.localeCompare(b.company)
      );
    } else {
      this.sortByCompanyIcon = faSortAlphaDown;
      this.contacts.sort((a, b) =>
        b.company.localeCompare(a.company)
      );
    }
  }

}

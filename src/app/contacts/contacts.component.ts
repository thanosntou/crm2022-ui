import {Component, OnInit} from '@angular/core';
import {ContactModel} from '../_models/contact.model';
import {Router} from '@angular/router';
import {ContactService} from '../_services/contact.service';
import {faSortAlphaDown, faSortAlphaUp} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  newExcelContactsForm: FormGroup;
  file: File = null;
  loading = false;
  sortByCompanyIcon = faSortAlphaDown;
  sortByNameIcon = faSortAlphaDown;
  sortBySurnameIcon = faSortAlphaDown;
  sortByWebsiteIcon = faSortAlphaDown;
  sortByCountryIcon = faSortAlphaDown;
  sortBySkypeIcon = faSortAlphaDown;
  sortByLinkedInIcon = faSortAlphaDown;
  sortByBusinessTypeIcon = faSortAlphaDown;

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
        'company': new FormControl(null, Validators.required),
        'name': new FormControl(null),
        'surname': new FormControl(null),
        'country': new FormControl(null, Validators.required),
        'website': new FormControl(null),
        'skype': new FormControl(null),
        'viber': new FormControl(null),
        'whatsApp': new FormControl(null),
        'weChat': new FormControl(null),
        'linkedIn': new FormControl(null),
        'businessType': new FormControl(null, Validators.required),
        'comments': new FormControl(null)
      })
    });
    this.newExcelContactsForm = new FormGroup({
      'excelContactData': new FormGroup({
        'file': new FormControl(null, Validators.required)
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

  onChange(event) {
    this.file = event.target.files[0];
  }

  onExcelFileUpload() {
    // const file: File = this.newExcelContactsForm.get('excelContactData').get('file').value;
    // console.log(file);
    this.loading = !this.loading;
    this.contactService.excelFileUpload(this.file).subscribe(
      (result) => {
        console.log('ok');
        this.contactService.getAll().subscribe(response => this.contacts = response);
        this.newExcelContactsForm.get('excelContactData').get('file').reset();
        this.loading = false;
      },
      // (result) => result.forEach(contact => this.contacts.push(contact)),
      error => console.log(JSON.stringify(error))
    );
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
      this.contacts.sort((a, b) => a.company.localeCompare(b.company));
    } else {
      this.sortByCompanyIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.company.localeCompare(a.company));
    }
  }

  sortByName() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  sortBySurname() {
    if (this.sortBySurnameIcon === faSortAlphaDown) {
      this.sortBySurnameIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.surname.localeCompare(b.surname));
    } else {
      this.sortBySurnameIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.surname.localeCompare(a.surname));
    }
  }

  sortByWebsite() {
    if (this.sortByWebsiteIcon === faSortAlphaDown) {
      this.sortByWebsiteIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.website.localeCompare(b.website));
    } else {
      this.sortByWebsiteIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.website.localeCompare(a.website));
    }
  }

  sortByCountry() {
    if (this.sortByCountryIcon === faSortAlphaDown) {
      this.sortByCountryIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.country.name.localeCompare(b.country.name));
    } else {
      this.sortByCountryIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.country.name.localeCompare(a.country.name));
    }
  }

  sortBySkype() {
    if (this.sortBySkypeIcon === faSortAlphaDown) {
      this.sortBySkypeIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.skype.localeCompare(b.skype));
    } else {
      this.sortBySkypeIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.skype.localeCompare(a.skype));
    }
  }

  sortByWeChat() {
    if (this.sortByWebsiteIcon === faSortAlphaDown) {
      this.sortByWebsiteIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.weChat.localeCompare(b.weChat));
    } else {
      this.sortByWebsiteIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.weChat.localeCompare(a.weChat));
    }
  }

  sortByLinkedIn() {
    if (this.sortByLinkedInIcon === faSortAlphaDown) {
      this.sortByLinkedInIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.linkedIn.localeCompare(b.linkedIn));
    } else {
      this.sortByLinkedInIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.linkedIn.localeCompare(a.linkedIn));
    }
  }

  sortByBusinessType() {
    if (this.sortByBusinessTypeIcon === faSortAlphaDown) {
      this.sortByBusinessTypeIcon = faSortAlphaUp;
      this.contacts.sort((a, b) => a.businessType.localeCompare(b.businessType));
    } else {
      this.sortByBusinessTypeIcon = faSortAlphaDown;
      this.contacts.sort((a, b) => b.businessType.localeCompare(a.businessType));
    }
  }

}

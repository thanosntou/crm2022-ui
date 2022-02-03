import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ContactModel} from '../_models/contact.model';
import {Router} from '@angular/router';
import {ContactService} from '../_services/contact.service';
import {faSortAlphaDown, faSortAlphaUp} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountryModel} from '../_models/country.model';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: ContactModel[] = [];
  contactsToShow: ContactModel[] = [];
  pageCapacity = 20;
  totalPages: number;
  totalPagesArray: number[];
  pageToContactsMap: Map<number, ContactModel[]>;
  selectedPage: number;

  countries: CountryModel[] = [];
  businessTypes: string[] = [];
  newContactForm: FormGroup;
  newExcelContactsForm: FormGroup;
  newEmailForm: FormGroup;
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

  @ViewChild('myInputFile', {static: false})
  myInputVariable: ElementRef;

  static downloadFile(data: Blob) {
    console.log('here');
    const blob = new Blob([data], {type: 'application/octet-stream'});
    FileSaver.saveAs(blob, 'Contacts_Export.xlsx');
  }

  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnInit() {
    this.contactService.getAll().subscribe(response => {
      this.contacts = response;
      this.calculateContactsTablePages();
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
        'website': new FormControl(null),
        'email': new FormControl(null, Validators.required),
        'country': new FormControl(null, Validators.required),
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
    this.newEmailForm = new FormGroup({
      'emailData': new FormGroup({
        'subject': new FormControl(null),
        'content': new FormControl(null),
        'businessTypeForm': new FormControl(null, Validators.required)
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
      this.newContactForm.get('contactData').get('website').reset();
      this.newContactForm.get('contactData').get('email').reset();
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

  onImport() {
    this.loading = !this.loading;
    this.contactService.importFromFile(this.file).subscribe(
      () => {
        this.newExcelContactsForm.get('excelContactData').get('file').reset();
        this.loading = false;
        this.myInputVariable.nativeElement.value = '';
        alert('Contacts from excel file imported successfully!');
      },
      error => console.log(JSON.stringify(error)),
      () => this.contactService.getAll().subscribe(
        response => this.contacts = response,
        error => console.log(JSON.stringify(error)),
        () => this.calculateContactsTablePages())
    );
  }

  onExportToDownload() {
    const type = 'DOWNLOAD';
    this.contactService.export(type).subscribe(
      data => {
        ContactsComponent.downloadFile(data);
      },
      error => console.log('Error downloading the file.', error));
  }


  onExportToEmail() {
    const type = 'EMAIL';
    if (confirm('Export contacts into excel file?')) {
      this.contactService.export(type).subscribe(
        () => alert('Exported excel file of contacts sent to your email successfully!'),
        error => console.log(JSON.stringify(error))
      );
    }
  }

  onSendEmail() {
    const email = this.newEmailForm.get('emailData').value;
    console.log(email);
    if (confirm('Send email to all contacts?')) {
      this.contactService.sendEmail(email).subscribe(
        () => {
          this.newEmailForm.get('emailData').get('subject').reset();
          this.newEmailForm.get('emailData').get('content').reset();
          this.newEmailForm.get('emailData').get('businessType').reset();
          alert('Email sent!');
        },
        error => console.log(JSON.stringify(error))
      );
    }
  }

  onDelete(contact: ContactModel) {
    this.contactService.delete(contact.id).subscribe(
      () => this.contactService.getAll().subscribe(
        response => this.contactService.getAll().subscribe(
          contactsResponse => {
            this.contacts = contactsResponse;
            this.calculateContactsTablePages();
          },
          error => console.log(JSON.stringify(error))),
        error => console.log(JSON.stringify(error))
      ));
  }

  onDeleteAll() {
    if (confirm('Are you sure you want to delete all contacts?')) {
      this.contactService.deleteAll().subscribe(
        () => {
          this.contactService.getAll().subscribe(
            response => {
              this.contacts = response;
              this.calculateContactsTablePages();
            },
            error => console.log(JSON.stringify(error)));
        },
        error => console.log(JSON.stringify(error)),
        () => alert('All contacts deleted!')
      );
    }
    this.contactsToShow = [];
  }


  onSelect(contact: ContactModel) {
    this.router.navigate(['/contact', contact.id]);
  }

  calculateContactsTablePages() {
    this.totalPages = 0;
    this.totalPagesArray = [];
    this.pageToContactsMap = new Map<number, ContactModel[]>();

    const contactsSize = this.contacts.length;
    let needs1Extra = false;

    if (contactsSize > this.pageCapacity) {
      this.totalPages = Math.floor(this.contacts.length / this.pageCapacity);
      if ((this.contacts.length % this.pageCapacity) > 0) {
        needs1Extra = true;
      }
    } else if (contactsSize > 0) {
      this.totalPages = 1;
    } else {
      this.contactsToShow = [];
    }

    if (this.totalPages > 0) {
      for (let n = 1; n <= this.totalPages; n++) {
        this.totalPagesArray.push(n);
        this.pageToContactsMap.set(n, this.contacts.slice(this.pageCapacity * (n - 1), this.pageCapacity * n));
      }
      if ((this.totalPages * this.pageCapacity) < contactsSize) {
        this.pageToContactsMap.set(this.totalPages + 1, this.contacts.slice(this.totalPages * this.pageCapacity, contactsSize));
      }
      this.selectedPage = 1;
      this.contactsToShow = this.pageToContactsMap.get(1);
    }
    if (needs1Extra) {
      this.totalPages = this.totalPages + 1;
      this.totalPagesArray.push(this.totalPages);
    }
    console.log('totalPages: ' + this.totalPages);
    console.log('totalPagesArray: ' + this.totalPagesArray);
  }

  onSelectPage(pageNumber: number) {
    this.selectedPage = pageNumber;
    this.contactsToShow = this.pageToContactsMap.get(pageNumber);
  }

  onSearchInput() {
    const inputValue = (<HTMLInputElement>document.getElementById('searchInput')).value;
    this.contactService.search(inputValue).subscribe(response => {
      this.contacts = response;
      this.calculateContactsTablePages();
    });
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

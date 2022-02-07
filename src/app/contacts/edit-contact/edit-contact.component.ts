import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {ContactModel} from '../../_models/contact.model';
import {ContactService} from '../../_services/contact.service';
import {CountryModel} from '../../_models/country.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: ContactModel;
  countries: CountryModel[] = [];
  businessTypes: string[] = [];
  updateContactForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.contact = data['contact'];
    });
    this.contactService.getSupportedCountries().subscribe(response => {
      this.countries = response;
    });
    this.contactService.getSupportedBusinessTypes().subscribe(response => {
      this.businessTypes = response;
    });

    this.updateContactForm = new FormGroup({
      'contactData': new FormGroup({
        'company': new FormControl(this.contact.company),
        'name': new FormControl(this.contact.name),
        'surname': new FormControl(this.contact.surname),
        'website': new FormControl(this.contact.website),
        'email': new FormControl(this.contact.email),
        'country': new FormControl(this.contact.country),
        'skype': new FormControl(this.contact.skype),
        'viber': new FormControl(this.contact.viber),
        'whatsApp': new FormControl(this.contact.whatsApp),
        'weChat': new FormControl(this.contact.weChat),
        'linkedIn': new FormControl(this.contact.linkedIn),
        'businessType': new FormControl(this.contact.businessType),
        'comments': new FormControl(this.contact.comments),
      })
    });
  }

  onUpdateContact() {
    const contact: ContactModel = this.updateContactForm.get('contactData').value;
    this.keepOnlyChanges(contact);
    this.contactService.update(this.contact.id, contact).subscribe(
      () => this.router.navigate(['contacts']));
  }

  private keepOnlyChanges(contact: ContactModel) {
    contact.id = undefined;
    if (contact.company === this.contact.company) {
      contact.company = undefined;
    }
    if (contact.name === this.contact.name) {
      contact.name = undefined;
    }
    if (contact.surname === this.contact.surname) {
      contact.surname = undefined;
    }
    if (contact.website === this.contact.website) {
      contact.website = undefined;
    }
    if (contact.email === this.contact.email) {
      contact.email = undefined;
    }
    if (contact.country === this.contact.country) {
      contact.country = undefined;
    }
    if (contact.skype === this.contact.skype) {
      contact.skype = undefined;
    }
    if (contact.viber === this.contact.viber) {
      contact.viber = undefined;
    }
    if (contact.whatsApp === this.contact.whatsApp) {
      contact.whatsApp = undefined;
    }
    if (contact.weChat === this.contact.weChat) {
      contact.weChat = undefined;
    }
    if (contact.linkedIn === this.contact.linkedIn) {
      contact.linkedIn = undefined;
    }
    if (contact.businessType === this.contact.businessType) {
      contact.businessType = undefined;
    }
    if (contact.comments === this.contact.comments) {
      contact.comments = undefined;
    }
  }

}

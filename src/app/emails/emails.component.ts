import { Component, OnInit } from '@angular/core';
import {ExportModel} from '../_models/export.model';
import {ExportService} from '../_services/export.service';
import {Router} from '@angular/router';
import {EmailModel} from '../_models/email.model';
import {EmailService} from '../_services/email.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {
  emails: EmailModel[] = [];

  constructor(private emailService: EmailService, private router: Router) {
  }

  ngOnInit() {
    this.emailService.getAll().subscribe(response => {
      this.emails = response;
    });
  }

  sortByName() {

  }

  sortByImportedOn() {

  }

  sortByCount() {

  }

}

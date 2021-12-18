import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ImportService} from '../_services/import.service';
import {ImportModel} from '../_models/import.model';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent implements OnInit {
  imports: ImportModel[] = [];

  constructor(private importService: ImportService, private router: Router) {
  }

  ngOnInit() {
    this.importService.getAll().subscribe(response => {
      this.imports = response;
    });
  }

  sortByName() {

  }

  sortByImportedOn() {

  }

  sortByCount() {

  }
}

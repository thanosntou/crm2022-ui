import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExportModel} from '../_models/export.model';
import {ExportService} from '../_services/export.service';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css']
})
export class ExportsComponent implements OnInit {
  exports: ExportModel[] = [];

  constructor(private exportService: ExportService, private router: Router) {
  }

  ngOnInit() {
    this.exportService.getAll().subscribe(response => {
      this.exports = response;
    });
  }

  sortByName() {

  }

  sortByImportedOn() {

  }

  sortByCount() {

  }
}

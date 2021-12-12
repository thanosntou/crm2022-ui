import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: {
    client: string,
    walletBalance: number,
    activeBalance: number,
    availableMargin: number,
    earned: number
  };

  constructor(private http: HttpClient,
              public authService: AuthenticationService) { }

  ngOnInit() {
  }

}

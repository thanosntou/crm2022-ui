import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  faCoffee, faCogs, faHandshake, faHistory,
  faSatelliteDish, faSignOutAlt, faUser, faIdCard,
  faUsers, faComments, faQuestionCircle, faFileImport, faFileExport, faEnvelopeSquare, faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {UserDetailsModel} from '../_models/user-details.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userDetails: UserDetailsModel;
  isRoot = false;
  isAdmin = false;
  @Output() userSignedOut = new EventEmitter<{ signedOut: boolean }>();
  @Output() tabSelected = new EventEmitter<string>();

  faCoffee = faCoffee;
  faUsers = faUsers;
  faSignOutAlt = faSignOutAlt;
  faContacts = faIdCard;
  faImports = faFileImport;
  faExports = faFileExport;
  faHandshake = faHandshake;
  faHistory = faHistory;
  faCogs = faCogs;
  faComment = faComments;
  faSatelliteDish = faSatelliteDish;
  faQuestionCircle = faQuestionCircle;
  faUser = faUser;
  faEmails = faEnvelopeOpenText;

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userDetails = this.authService.findUserDetails();
    this.authService.findUserRoles().forEach(auth => {
      if (auth.role === 'ROOT') {
        this.isRoot = true;
      }
      if (auth.role === 'ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  onSignOut() {
    this.isAdmin = false;
    this.userDetails = null;
    this.authService.deleteUserConnection();
    this.router.navigate(['/login']);
  }

}

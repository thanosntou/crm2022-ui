import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ContactService} from '../_services/contact.service';
import {ContactModel} from '../_models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService {

  constructor(private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactModel> | Promise<ContactModel> | ContactModel {
    return this.contactService.getOne(+route.params['id']);
  }
}

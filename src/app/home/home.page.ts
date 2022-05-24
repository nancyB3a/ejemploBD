import { Component } from '@angular/core';
import { ServiceDbService } from '../services/service-db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public servicioDB: ServiceDbService) {}

}

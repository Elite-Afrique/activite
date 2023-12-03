import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableServiceService {
  adresse = location.origin + '/backend/public/index.php/api';
  url: string = location.origin.includes('activite.elite-afrique.com')? this.adresse: 'http://127.0.0.1:8000/api';
  constructor() { 
    // console.log(this.url)
  }
}

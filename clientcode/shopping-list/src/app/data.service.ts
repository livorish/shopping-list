import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map, filter, scan  } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: Http ) { }

  getShoppingItems() {
    return this.http
    .get('http://localhost:5000/api/items').pipe(
      map(res => res.json()));
    
  }

  addShoppingItem(newItem){
    let headers = new Headers(); 
    headers.append('content-type', 'application/json');
    return this.http
    .post('http://localhost:5000/api/item', newItem, {headers: headers}).pipe(
      map(res => res.json()) );
   
  }

  deleteShoppingItem (id){
    return this.http
    .delete('http://localhost:5000/api/item/'+id).pipe(
      map(res => res.json()));
    
  } 


  updateShoppingItem(newItem){
    let headers = new Headers(); 
    headers.append('content-type', 'application/json');
    return this.http
    .put('http://localhost:5000/api/item/'+newItem._id, newItem, {headers: headers}).pipe(
      map(res => res.json()) );
   
  }

}
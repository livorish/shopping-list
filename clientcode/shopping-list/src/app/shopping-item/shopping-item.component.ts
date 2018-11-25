import { Component, OnInit } from '@angular/core';
import { Item }  from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})

export class ShoppingItemComponent implements OnInit {

  shoppingItemlist: Item[] = []; 
  selectedItem: Item; 
  toggleForm: boolean = false;

  constructor(private dataservice: DataService ) { }

  getItems (){
    this.dataservice.getShoppingItems()
    .subscribe(items => {
      this.shoppingItemlist = items;
      console.log('data from dataservice: ' + this.shoppingItemlist[0].itemName);
    })
  }

  addItem(form) {
     let newItem: Item = {
       itemName: form.value.itemName,
       itemQuantity: form.value.itemQuantity,
       itemBought: false
     } 
     
     this.dataservice.addShoppingItem(newItem)
     .subscribe(item => {
       console.log(item);
       this.getItems(); 
     });
  } 

  deleteItem(id){
    this.dataservice.deleteShoppingItem(id)
    .subscribe(data => {
      console.log(data);
      if(data.n == 1){
        for(var i=0; i<this.shoppingItemlist.length; i++){
          if(id == this.shoppingItemlist[i]._id){
            this.shoppingItemlist.splice(i, 1);
          }
        }
      }
    });
  }

  editItem(form){
     let newItem: Item = {
       _id: this.selectedItem._id,
       itemName: form.value.itemName,
       itemQuantity: form.value.itemQuantity,
       itemBought: form.value.itemBought
     } 

     this.dataservice.updateShoppingItem(newItem)
     .subscribe(result => {
       console.log('original item be updated with old values.' + result.itemQuantity);
       this.getItems();
     });
     this.toggleForm = !this.toggleForm;
  }

  showEditForm(item) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;

  }

  updateItemChecked(item){
    item.itemBought = !item.itemBought;
    this.dataservice.updateShoppingItem(item)
    .subscribe(result => {
      console.log('original checkbox values.' + result.itemBought);
      this.getItems();
    });
  }

  ngOnInit() {
    this.getItems(); 
  }
  

}

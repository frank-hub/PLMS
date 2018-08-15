import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Customerinterface } from '../../models/interface';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFirestore} from 'angularfire2/firestore';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customerInterface = {} as Customerinterface;
  customerRef: AngularFireList<any>;
  customeref: Observable<any[]>;
  customer;
  constructor(public navCtrl: NavController,public database : AngularFireDatabase , public afs : AngularFirestore) {
    this.customerRef = this.database.list('customers');
    // this.customeref = afs.collection('items').valueChanges();
    this.getCustomer();

  }
  getCustomer() {
    this.database.list('customers/').valueChanges().subscribe(
      data => {
        console.log(data)
        this.customer = data
      }
    )
  }
  addCustomer(customerInterface: Customerinterface){
// console.log(customerInterface);
  this.customerRef.push({
    customer_ref: this.customerInterface.customer_ref,
    latitude: this.customerInterface.latitute,
    longitute: this.customerInterface.longitude,
    noti_status: this.customerInterface.noti_status
  });
    this.customerInterface = {} as Customerinterface;
}
}

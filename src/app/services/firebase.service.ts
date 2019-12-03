import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICustomer } from '../models/customer.interface';

export interface ICustomerID extends ICustomer { id: string }

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private customerCollection: AngularFirestoreCollection<ICustomer>;
    customers: Observable<ICustomerID[]>;

    public selected: ICustomerID = {
        id: null,
        name: '',
        city: '',
        order: ''
    };

    constructor(private readonly afs: AngularFirestore) {
        this.customerCollection = afs.collection<ICustomer>('customers');

        this.customers = this.customerCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as ICustomer;
                const id      = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    getAllCustomers(): Observable<ICustomerID[]> {
        return this.customers;
    }

    createCustomer(customer: ICustomer): Promise<DocumentReference> {
        return this.customerCollection.add(customer);
    }

    editCustomer(customer: ICustomerID): Promise<void> {
        return this.customerCollection.doc(customer.id).update(customer);
    }

    deleteCustomer(id: string): Promise<void> {
        return this.customerCollection.doc(id).delete();
    }

}

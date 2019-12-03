import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatBottomSheet } from '@angular/material';

import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { FirebaseService, ICustomerID } from '../../services/firebase.service';
import { FormComponent } from '../form/form.component';

@Component({
    selector: 'app-list-customers',
    templateUrl: './list-customers.component.html',
    styleUrls: []
})
export class ListCustomersComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['name', 'city', 'order', 'actions'];
    dataSource = new MatTableDataSource();

    data: ICustomerID[] = [];

    @ViewChild(MatSort, null) sort: MatSort;

    firebaseSubscription: Subscription = new Subscription();

    constructor(
        private _firebaseService: FirebaseService,
        private _bottomSheet: MatBottomSheet
    ) { }

    ngOnInit(): void {
        this.firebaseSubscription = this._firebaseService.getAllCustomers().subscribe(res => {
            this.dataSource.data = res;
            this.data = res;
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onEdit(element: ICustomerID): void {
        if (element) {
            this._firebaseService.selected = element;
            const form = this._bottomSheet.open(FormComponent);
            form.disableClose = true;
        }
    }

    onDelete(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this._firebaseService.deleteCustomer(id);

                Swal.fire(
                    'Deleted!',
                    'Your customer has been deleted.',
                    'success'
                )
            }
        });
    }

    ngOnDestroy(): void {
        this.firebaseSubscription.unsubscribe();
    }

}

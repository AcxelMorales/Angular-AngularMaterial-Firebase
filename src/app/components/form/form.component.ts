import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';

import Swal from 'sweetalert2';

import { FirebaseService } from '../../services/firebase.service';
import { ICustomer } from 'src/app/models/customer.interface';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styles: []
})
export class FormComponent {

    name = new FormControl('', [Validators.required]);
    city     = new FormControl('', [Validators.required]);
    order = new FormControl('', [Validators.required]);

    getErrorMessage() {
        return this.name.hasError('required') ? 'You must enter a value' :
                     this.city.hasError('required') ? 'You must enter a value' :
                     this.order.hasError('required') ? 'You must enter a value' : '';
    }

    constructor(
        public _firebaseService: FirebaseService,
        private _bottomSheet: MatBottomSheet
    ) { }

    onSaveForm(form: NgForm): void {
        if (form.invalid) return;

        if (this._firebaseService.selected.id === null) {
            let newCustomer: ICustomer = {
                name: this._firebaseService.selected.name,
                city: this._firebaseService.selected.city,
                order: this._firebaseService.selected.order
            };

            this._firebaseService.createCustomer(newCustomer);
        } else {
            this._firebaseService.editCustomer(this._firebaseService.selected);
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });

        this._bottomSheet.dismiss();
    }

    onClose(): void {
        this._bottomSheet.dismiss();
        this._firebaseService.selected = {
            id: null,
            name: '',
            city: '',
            order: ''
        };
    }

}

import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { FormComponent } from '../form/form.component';
import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styles: []
})
export class ToolbarComponent  {

    constructor(
        private _bottomSheet: MatBottomSheet,
        private readonly _firebaseService: FirebaseService
    ) { }

    onCreate(): void {
        const form = this._bottomSheet.open(FormComponent);
        form.disableClose = true;

        this._firebaseService.selected = {
            id: null,
            name: '',
            city: '',
            order: ''
        }
    }

}

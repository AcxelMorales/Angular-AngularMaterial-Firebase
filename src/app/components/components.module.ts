import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { ListCustomersComponent } from './list-customers/list-customers.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormComponent } from './form/form.component';
import { NoCustomersComponent } from './no-customers/no-customers.component';

@NgModule({
    declarations: [
        ListCustomersComponent,
        ToolbarComponent,
        FormComponent,
        NoCustomersComponent
    ],
    exports: [
        ListCustomersComponent,
        ToolbarComponent,
        NoCustomersComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    entryComponents: [FormComponent]
})
export class ComponentsModule { }

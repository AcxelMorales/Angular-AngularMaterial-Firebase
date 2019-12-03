import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.configFirebase),
        MaterialModule,
        ComponentsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecordComponent } from './components/record/record.component';
import { FilterSectionComponent } from './components/filter-section/filter-section.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';

// Services
import { RecordsService } from './services/records.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecordComponent,
    FilterSectionComponent,
    SearchSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    RecordsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

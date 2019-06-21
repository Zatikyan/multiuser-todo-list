import { Component } from '@angular/core';

// Services
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent {

  searchType: string = 'title';

  title: string;
  place: string;
  address: string;

  constructor(
    private recordsService: RecordsService,
  ) { }

  search(): void {
    switch (this.searchType) {
      case 'title':
        this.recordsService.searchBy('title', this.title);
        break;
      case 'place':
        this.recordsService.searchBy('placeName', this.place);
        break;
      case 'address':
        this.recordsService.searchBy('address', this.address);
    }
  }

}

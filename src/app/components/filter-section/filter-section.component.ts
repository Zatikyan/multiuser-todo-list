import { Component } from '@angular/core';

// Services
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss']
})
export class FilterSectionComponent {

  filterType: string = 'status';

  status: string = 'done';
  date: Date | string = new Date();
  place: string;
  address: string;

  constructor(
    private recordsService: RecordsService,
  ) { }

  applyFilter(): void {
    switch (this.filterType) {
      case 'status':
        const status = this.getStatus();
        this.recordsService.filterByStatus(status);
        break;
      case 'date':
        this.recordsService.filterByDate(this.date as string);
        break;
      case 'place':
        this.recordsService.filterBy('placeName', this.place);
        break;
      case 'address':
        this.recordsService.filterBy('address', this.address);
        break;
    }
  }

  // PRIVATE METHODS

  private getStatus(): boolean {
    return this.status === 'done';
  }

}

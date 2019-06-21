import { Component, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Record } from '../../services/records.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {

  @Input('record') record: Record;

  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  editRecord(): void {
    this.onEdit.emit(this.record);
  }

  deleteRecord(): void {
    this.onDelete.emit(this.record);
  }

  getDate(): string {
    return this.record.date ? new Date(this.record.date).toLocaleDateString() : '';
  }

  notOutdated(): boolean {
    const [today, recordDate] = this.getDates();
    return !this.record.status && new Date(today).getTime() < new Date(recordDate).getTime();
  }

  isForToday(): boolean {
    const [today, recordDate] = this.getDates();
    return !this.record.status && new Date(today).getTime() === new Date(recordDate).getTime()
  }

  outdated(): boolean {
    const [today, recordDate] = this.getDates();
    return !this.record.status && new Date(today).getTime() > new Date(recordDate).getTime();
  }

  // PRIVATE METHODS

  private getDates(): string[] {
    return [
      new Date().toLocaleDateString(),
      new Date(this.record.date).toLocaleDateString()
    ]
  }

}

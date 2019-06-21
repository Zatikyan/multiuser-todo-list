import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// Services
import { RecordsService, Record } from './services/records.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multiuser-todo-list';

  recordToEdit: Record = this.recordsService.createEmptyRecord();
  recordIdToDelete: string | undefined;

  filterSectionType: string | undefined;

  modalRef: BsModalRef;

  constructor(
    private recordsService: RecordsService,
    private modalService: BsModalService
  ) { }

  get records(): Record[] {
    return this.recordsService.userRecords;
  }

  openSearchBar(): void {
    this.filterSectionType = this.filterSectionType === 'search' ? undefined : 'search';
    this.recordsService.removeFilters();
  }

  openFilterBar(): void {
    this.filterSectionType = this.filterSectionType === 'filter' ? undefined : 'filter';
    this.recordsService.removeFilters();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      ignoreBackdropClick: true,
      keyboard: false
    });
  }

  closeRecordModal(): void {
    this.recordToEdit = this.recordsService.createEmptyRecord();
    this.modalRef.hide();
  }

  saveRecord(): void {
    this.recordToEdit.new ? this.addNewRecord() : this.updateRecord();
    this.closeRecordModal();
  }

  onRecordEdit(record: Record, template: TemplateRef<any>): void {
    this.recordToEdit = Object.assign({}, record);
    this.openModal(template);
  }

  onRecordDelete(record: Record, template: TemplateRef<any>): void {
    this.recordIdToDelete = record.id;
    this.openModal(template);
  }

  closeDeleteRecordModal(): void {
    this.recordIdToDelete = undefined;
    this.modalRef.hide();
  }

  deleteRecord(): void {
    this.recordsService.deleteRecord(this.recordIdToDelete);
    this.closeDeleteRecordModal();
  }

  // PRIVATE METHODS

  addNewRecord(): void {
    delete this.recordToEdit.new;
    this.recordsService.addRecord = this.recordToEdit;
  }

  updateRecord(): void {
    this.recordsService.updateRecord(this.recordToEdit);
  }
}

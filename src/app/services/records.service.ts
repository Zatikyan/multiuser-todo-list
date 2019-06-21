// Users service is developed to manage the information about users
// Service contains functionality for storing, creation, update a delete users

import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private records: any = {};
  private activeUserId: string;

  constructor() {
    this.records = this.getExistingRecords();
  }

  get userRecords(): Record[] {
    return this.records[this.activeUserId] || [];
  }

  set setUserRecords(records: Record[]) {
    this.records[this.activeUserId] = records;
  }

  set addRecord(record: Record) {
    this.userRecords.push(record);
    this.saveRecords();
  }

  get getActiveUserId() {
    return this.activeUserId
  }

  set setActiveUserId(userId: string) {
    this.activeUserId = userId;

    // Create records array for the user with the provided id if don't exist
    if (!this.userRecords) {
      this.setUserRecords = [];
    }
  }

  updateRecord(record: Record): void {
    const index = this.userRecords.findIndex(el => el.id === record.id);
    this.userRecords[index] = record;
    this.saveRecords();
  }

  deleteUserRecords(userId: string): void {
    delete this.records[userId];
    this.saveRecords();
  }

  deleteRecord(id: string): void {
    const index = this.userRecords.findIndex(el => el.id === id);
    this.userRecords.splice(index, 1);
    this.saveRecords();
  }

  // Search functions

  removeFilters(): void {
    this.records = this.getExistingRecords();
  }

  searchBy(key: string, value: string): void {
    if (value) {
      this.removeFilters();
      this.setUserRecords = this.userRecords.filter(el => {
        return el[key].toLowerCase().includes(value.toLowerCase())
      });
    }
  }

  // Filter functions

  filterByStatus(status: boolean): void {
    this.removeFilters();
    this.setUserRecords = this.userRecords.filter(el => el.status === status);
  }

  filterByDate(filterDate: string): void {
    this.removeFilters();
    this.setUserRecords = this.userRecords.filter(el => {
      return this.isDatesEqual(el.date as string, filterDate);
    });
  }

  filterBy(key: string, value: string): void {
    if (value) {
      this.removeFilters();
      this.setUserRecords = this.userRecords.filter(el => el[key].toLowerCase() === value.toLowerCase());
    }
  }

  createEmptyRecord(): Record {
    return {
      id: uuid(),
      title: '',
      description: '',
      status: false,
      date: new Date(),
      placeName: '',
      address: '',
      new: true
    }
  }

  // PRIVATE METHODS

  // Use Date convertation to exclude hours and minutes
  private isDatesEqual(recordDate: string, filterDate: string): boolean {
    const [recDate, filtDate] = this.getDates(recordDate, filterDate);
    return new Date(recDate).getTime() === new Date(filtDate).getTime()
  }

  private getDates(recDate: string, filtDate: string): string[] {
    return [
      new Date(recDate).toLocaleDateString(),
      new Date(filtDate).toLocaleDateString()
    ]
  }

  private saveRecords(): void {
    localStorage.setItem('todo_list_records', JSON.stringify(this.records));
  }

  private getExistingRecords(): Record[] {
    const records = JSON.parse(localStorage.getItem('todo_list_records')) || {};
    return records;
  }
}

export interface Record {
  id: string,
  title: string,
  description: string,
  status: boolean,
  date: Date | string,
  placeName: string,
  address: string,
  new?: boolean
}
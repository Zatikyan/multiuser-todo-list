// Users service is developed to manage the information about users
// Service contains functionality for storing, creation, update a delete users

import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [];

  constructor() {
    this.users = this.getExistingUsers();
  }

  get getUsers() {
    return this.users;
  }

  set setUser(user: User) {
    this.users.push(user);
    this.saveUsers();
  }

  createNewUser(): User {
    return {
      id: uuid(),
      name: 'New User'
    }
  }

  setActiveUser(id: string): void {
    this.removeActiveUser();
    const activeUser = this.users.find(el => el.id === id);
    activeUser.active = true;
    this.saveUsers();
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex(el => el.id === id);
    this.users.splice(index, 1);
    this.saveUsers();
  }

  // PRIVATE METHODS

  private removeActiveUser(): void {
    const activeUser = this.users.find(el => el.active);
    delete activeUser.active;
  }

  private saveUsers(): void {
    localStorage.setItem('todo_list_users', JSON.stringify(this.users));
  }

  private getExistingUsers(): User[] {
    const users = localStorage.getItem('todo_list_users');

    // Return users from local storage or create the first user
    return users ? JSON.parse(users) : [this.createFirstUser()];
  }

  private createFirstUser(): User {
    const user = this.createNewUser();
    user.active = true;
    localStorage.setItem('todo_list_users', JSON.stringify([user]));
    return user;
  }
}

export interface User {
  id: string,
  name: string,
  active?: boolean
}

import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// Services
import { UsersService, User } from '../../services/users.service';
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  newUser: User;
  userIdToDelete: string | undefined;

  modalRef: BsModalRef;

  constructor(
    private usersService: UsersService,
    private recordsService: RecordsService,
    private modalService: BsModalService
  ) {
    this.newUser = this.usersService.createNewUser();
    this.recordsService.setActiveUserId = this.getActiveUserId()
  }

  get users(): User[] {
    return this.usersService.getUsers;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {
      ignoreBackdropClick: true,
      keyboard: false
    });
  }

  openDeleteUserModal(id: string, template: TemplateRef<any>): void {
    this.userIdToDelete = id;
    this.modalRef = this.modalService.show(template, {
      ignoreBackdropClick: true,
      keyboard: false
    });
  }

  closeModal(): void {
    this.newUser = this.usersService.createNewUser();
    this.userIdToDelete = undefined;
    this.modalRef.hide();
  }

  getActiveUserName(): string {
    const user = this.users.find(el => el.active);
    return user.name || '';
  }

  saveNewUser(): void {
    this.usersService.setUser = this.newUser;
    this.setActiveUser();
    this.closeModal();
  }

  chooseUser(id: string): void {
    this.usersService.setActiveUser(id);
    this.recordsService.setActiveUserId = id;
  }

  deleteUser(): void {
    this.usersService.deleteUser(this.userIdToDelete);
    this.recordsService.deleteUserRecords(this.userIdToDelete);
    this.closeModal();
  }

  // PRIVATE METHODS

  private setActiveUser(): void {
    this.usersService.setActiveUser(this.newUser.id);
    this.recordsService.setActiveUserId = this.newUser.id;
  }

  private getActiveUserId(): string {
    const activeUser = this.users.find(el => el.active);
    return activeUser.id;
  }

}

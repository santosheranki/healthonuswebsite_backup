import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }
  showModal: boolean = false;
  showfeedback: boolean = false;
  private showModalSubject: Subject<boolean> = new Subject<boolean>();
  showModal$ = this.showModalSubject.asObservable();
  toggleModal(show: boolean): void {
    this.showModalSubject.next(show);
  }
}
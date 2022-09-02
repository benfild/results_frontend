import { Injectable, ViewChild } from "@angular/core";
import { Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: 'root'})

export class NotificationService {
  isLoading = new Subject<boolean>();
  error: string = "";
  message: string = "";
  serverMessage = 'Internal Server Error';


  constructor(private toastr: ToastrService) { }


  showSuccess(message: string, title: string) {
    this.toastr.success(message, title)
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title)
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title)
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title)
  }
}

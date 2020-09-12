import { Injectable } from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class UtilsServiceService {
  public static REMOTE_ADDRESS = 'http://localhost:8090/';
  public static API_USER = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/user';
  public static API_COMPANY = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/company';
  public static API_FOURNISSEUR = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/fournisseur';

  constructor(private toastrService: NbToastrService) { }

  public showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}


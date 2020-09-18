import { Injectable } from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UtilsServiceService {
  public static REMOTE_ADDRESS = 'http://localhost:8090/';
  public static API_USER = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/user';
  public static API_COMPANY = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/company';
  public static API_PROVIDER = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/fournisseur';
  public static API_ACCOUNT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/account';
  public static API_CLIENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/client';


  constructor(private toastrService: NbToastrService, private httpClient: HttpClient) {
  }

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

  public post(url: string, object: any): Observable<any> {

    return this.httpClient.post(url, object);
  }

  public get(url: string): Observable<any> {

    return this.httpClient.get(url);
  }

  public delete(url: string): Observable<any> {

    return this.httpClient.delete(url);
  }

}

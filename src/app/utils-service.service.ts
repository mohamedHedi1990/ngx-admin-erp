import { Injectable } from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class UtilsServiceService {
  //public static REMOTE_ADDRESS = 'http://41.231.122.94:8090/';
  public static REMOTE_ADDRESS = 'http://localhost:8090/';
  public static API_USER = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/user';
  public static API_COMPANY = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/company';
  public static API_PROVIDER = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/provider';
  public static API_ACCOUNT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/account';
  public static API_CLIENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/customer';
  public static API_TARIF = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/tarif';
  public static API_TIME_LINE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/timeLine';
  public static API_PROVIDER_INVOICE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/invoice-provider';
  public static API_CUSTOMER_INVOICE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/invoice-customer';
  public static API_INVOICE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/invoice';
  public static API_TYPE_ENCAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/encaissement-type';
  public static API_TYPE_DECAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/decaissement-type';
  public static API_DECAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/decaissement';
  public static API_ENCAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/encaissement';
  public static API_PAYMENT_RULE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/paymentRule';
  public static API_SUIVIE_TRESERORIE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/supervision';
  public static API_GLOBAL_SUPERVISION = UtilsServiceService.API_SUIVIE_TRESERORIE + '/' + 'global';




  constructor(private toastrService: NbToastrService, private httpClient: HttpClient,
              private datePipe: DatePipe) {
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

  public put(url: string, object: any): Observable<any> {

    return this.httpClient.put(url, object);
  }

  public get(url: string): Observable<any> {

    return this.httpClient.get(url);
  }

  public delete(url: string): Observable<any> {

    return this.httpClient.delete(url);
  }

  now(format: string): string {

    return this.datePipe.transform(new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Tunis' }) +
      ' ' + new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Tunis' }), format, 'Africa/Tunis');

  }

  getDate(date: any, format: string): string {
    return this.datePipe.transform(date, format, 'Africa/Tunis');
  }

}


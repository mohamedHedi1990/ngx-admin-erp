import { Injectable } from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class UtilsServiceService {

   //public static REMOTE_ADDRESS = 'http://212.129.62.79:8090';
  public static REMOTE_ADDRESS = 'http://localhost:8090';

  // public static REMOTE_ADDRESS = 'https://erp-forecast-bi-services.herokuapp.com';
  public static API_AUTH=UtilsServiceService.REMOTE_ADDRESS+'/' +'api/auth/signin'
  public static API_BONLIVRAISON=UtilsServiceService.REMOTE_ADDRESS+'/'+'api/bonlivraison';
  public static API_USER = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/user';
  public static API_COMPANY = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/company';
  public static API_PROVIDER = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/provider';
  public static API_ACCOUNT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/account';
  public static API_COMISSION = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/comission';
  public static API_CLIENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/customer';
  public static API_PRODUIT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/product';
  public static API_TARIF = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/tarif';
  public static API_TIME_LINE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/timeLine';
  public static API_PROVIDER_INVOICE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/invoice-provider';
  public static API_CUSTOMER_INVOICE = UtilsServiceService.REMOTE_ADDRESS  +'/'+ 'api/invoice-customer';
  public static API_INVOICE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/invoice';
  public static API_TYPE_ENCAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/encaissement-type';
  public static API_TYPE_DECAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/decaissement-type';
  public static API_DECAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/decaissement';
  public static API_ENCAISSEMENT = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/encaissement';
  public static API_PAYMENT_RULE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/paymentRule';
  public static API_SUIVIE_TRESERORIE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/supervision';
  public static API_GLOBAL_SUPERVISION = UtilsServiceService.API_SUIVIE_TRESERORIE + '/' + 'global';
  public static API_NON_ENGAGE_SUPERVISION = UtilsServiceService.API_SUIVIE_TRESERORIE + '/' + 'non-engage';
  public static API_GLOBAL_ENGAGE = UtilsServiceService.API_SUIVIE_TRESERORIE + '/' + 'global-supervision-engage';

  public static API_RAAPROCHEMENT_BANCAIRE = UtilsServiceService.API_SUIVIE_TRESERORIE + '/' + 'rapprochement-bancaire';
  public static API_HISTORIC_SOLD = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/historic-account-sold';
  public static API_PROVIDER_ATTACHED_INVOICES = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/provider-attahced-invoices';
  public static API_CUSTOMER_ATTACHED_INVOICES = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/customer-attahced-invoices';
  public static API_FILE = UtilsServiceService.REMOTE_ADDRESS + '/' + 'api/file';
  static API_BONLIVRAISONLINE= UtilsServiceService.REMOTE_ADDRESS+'/'+'api/bonlivraisonline';
  static API_FACTURE=UtilsServiceService.REMOTE_ADDRESS+'/'+'api/facture';
  public static API_FACTURELINE= UtilsServiceService.REMOTE_ADDRESS+'/'+'api/factureline';
  static API_DEVIS=UtilsServiceService.REMOTE_ADDRESS+'/'+'api/devis';
  public static API_DEVISLINE= UtilsServiceService.REMOTE_ADDRESS+'/'+'api/devisline';
  public static API_AVOIR=UtilsServiceService.REMOTE_ADDRESS+'/'+'api/avoir';
  public static API_AVOIRLINE= UtilsServiceService.REMOTE_ADDRESS+'/'+'api/avoirline';
  header = new HttpHeaders();

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

  public post_promise(url: string, object: any): Promise<any> {

    return this.httpClient.post(url, object).toPromise();
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

  convertAmountToString(initialAmount: string) : string {
    let amount = '';
    if(initialAmount.includes('.')) {
      const array: any[] = initialAmount.split('.');
      if(array[1].length ===1) {
        array[1] = "." + array[1] + "00";
        return array[0] + array[1];
      } else if(array[1].length === 2) {
        array[1] = "." + array[1] + "0";
        return array[0] + array[1];
      }else if(array[1].length > 3){
        return array[0] + "." + array[1].substring(0,3);
      }
      return array[0] + '.' + array[1];
    }
    else {
      amount = initialAmount + '.000';
      return amount;
    }

  }

}


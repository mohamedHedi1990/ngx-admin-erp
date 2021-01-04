import { Component, OnInit } from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'ngx-liste-tarifs-bancaire',
  templateUrl: './liste-tarifs-bancaire.component.html',
  styleUrls: ['./liste-tarifs-bancaire.component.scss'],
})
export class ListeTarifsBancaireComponent implements OnInit {
  showAccountWindow = false;
  account = null;
  comission = null;
  loading = false;
  accounts = [];
  showTarifBancaireWindow = false;
  displayDeleteTarif = false;
  constructor(private UtilsService: UtilsServiceService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initComissionBancaire();
    this.getAllAccounts();
  }
  getAllAccounts() {

    const context = this;
    this.UtilsService.get(UtilsServiceService.API_ACCOUNT).subscribe( response => {
        context.accounts = response;
      },
      error => {
        this.UtilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors du chargement des comptes`);
      });
  }
  hideTarifBancaireWindow() {
    this.showTarifBancaireWindow = false;
  }

  initAccount() {
    this.account = null;
  }
  initComissionBancaire() {
    this.comission = {
      comissionLabel : '',
      comissionOperation: null,
      comissionValue: 0,
      commissionType: null,
    };
  }
  editAccount(account) {
    this.account = account;
    this.showTarifBancaireWindow = true;
  }
  deleteComission(comission) {
    this.comission = comission;
    this.displayDeleteTarif = true;
  }
  saveNewComissions(account) {
    let ListCommisions=[];
    const context = this;
    /*account.accountComissions.forEach(element => {
      console.log(element);
      let bank=account;
      bank.accountContacts=[];
      bank.accountComissions=[];
      element.bankAccount=bank;
      ListCommisions.push(element);
      console.log(element);*/
      this.UtilsService.post(UtilsServiceService.API_COMISSION + '/' + this.account.accountId + '/saveAndUpdateAllCommission', account.accountComissions).subscribe( response => {
        this.hideTarifBancaireWindow();

          this.UtilsService.showToast('success',
            'Compte bancaire modfié avec succés',
            `Le compte bancaire  ${account.accountLabel} a été modifié avec succcés`);

        context.getAllAccounts();
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la modification des comissions pour le compte banciare ${account.accountLabel}`); 
      });
    // });
  }

  delComission() {
    const context = this;
    this.UtilsService.delete(`${UtilsServiceService.API_COMISSION}/${this.comission.comissionId}`).subscribe( response => {
        this.UtilsService.showToast('success',
          'Comission bancaire supprimée avec succés',
          `La comission bancaire  ${this.comission.comissionLabel} a été supprimée avec succcés`);
        this.initComissionBancaire();
        this.getAllAccounts();
        this.displayDeleteTarif = false;
      },
      error => {this.UtilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression de la comission bancaire ${this.comission.comissionLabel}`);
        this.initComissionBancaire();
        this.getAllAccounts();
        this.displayDeleteTarif = false;
    });



  }

}

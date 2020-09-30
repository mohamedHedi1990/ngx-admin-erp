import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilsServiceService} from '../../../utils-service.service';
@Component({
  selector: 'ngx-nouveau-reglement',
  templateUrl: './nouveau-reglement.component.html',
  styleUrls: ['./nouveau-reglement.component.scss'],
})
export class NouveauReglementComponent implements OnInit {

  @Input() reglement = {
    paymentRuleAccountBank: null,
    paymentRuleAmount: '',
    paymentRulePaymentMethod: null,
    paymentRuleNumber: '',
    PaymentRulesDetails: '',
    paymentRuleDeadlineDate: null,
    accounts:[],

  };
  @Output() addNewReglementEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  accounts = [];
  constructor(private UtilsService: UtilsServiceService) { }

  ngOnInit(): void {
  }


}

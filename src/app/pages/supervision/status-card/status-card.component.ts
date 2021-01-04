import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card>
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h6">{{ title }}</div>
        
        <div class="status paragraph-2">{{ value }}</div>
        <div *ngIf="date !== ''" class="status paragraph-2"><span style="text-transform: lowercase !important;">le </span>{{ date }}</div>
   
        
        
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() value: string;
  @Input() date: string;
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Bitacora } from '../../interfaces/bitacora';
import { formatDate } from '@angular/common';

@Component({
  selector: 'bitacora_item',
  templateUrl: './bitacora_item.component.html',
  imports: [FormsModule]
})

export class BitacoraItemComponent {
  files: any[] = [];
  @Input() bitacora: Bitacora | null = null

  date(str: string) {
    return formatDate(Date.parse(str), 'dd-MM-yyyy - HH:mm:ss', 'en-US');
  }
}

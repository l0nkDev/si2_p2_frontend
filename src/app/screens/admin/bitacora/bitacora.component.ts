import { BitacoraItemComponent } from '../../../components/bitacora_item/bitacora_item.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Bitacora } from '../../../interfaces/bitacora';
import { API_ENDPOINT } from '../../../constants';


@Component({
  selector: 'bitacora',
  templateUrl: './bitacora.component.html',
  imports: [BitacoraItemComponent],
})

export class BitacoraComponent implements OnInit{
  page = 0;
  logs: Bitacora[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Bitacora[]>(API_ENDPOINT + "admin/logs/"
      , {headers: this.headers})
    .subscribe(_ => {
      this.logs = _;
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    this.page++;
    this.http.get<Bitacora[]>(API_ENDPOINT + "admin/logs/?page=" + this.page
      , {headers: this.headers})
      .subscribe(_ => {
        this.logs = this.logs.concat(_)
      }
    )
  }
}

}



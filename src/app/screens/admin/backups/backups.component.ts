import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { API_ENDPOINT } from '../../../constants';
import { Backup } from '../../../interfaces/backup';


@Component({
  selector: 'bitacora',
  templateUrl: './backups.component.html',
  imports: [],
})

export class BackupsComponent implements OnInit{
  backups: Backup[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Backup[]>(API_ENDPOINT + "admin/backups/"
      , {headers: this.headers})
    .subscribe(_ => {
      this.backups = _;
      this.backups.sort((a, b) => -a.name.localeCompare(b.name));
    })
  }

  restoreBackup(name: string) {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.put(API_ENDPOINT + "admin/backups/", {"name": name}
      , {headers: this.headers})
    .subscribe(_ => {
      confirm('Backup restaurada')
    })
  }

  makeBackup() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post(API_ENDPOINT + "admin/backups/", {}
      , {headers: this.headers})
    .subscribe(_ => {
      this.fetchContent()
    })
  }

}



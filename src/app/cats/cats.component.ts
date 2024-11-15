import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Cat {
  breeds: Breed[]
  url: string
}

export interface Breed {
  name: string
  temperament: string
  origin: string
  description: string
  wikipedia_url: string
}

@Component({
  selector: 'app-cats',
  imports: [MatToolbarModule, MatIconModule, MatDividerModule, MatButtonModule, MatCardModule, MatSidenavModule, MatGridListModule],
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.scss'
})
export class CatsComponent {
  readonly API_KEY = 'live_DzObmDHUc5ku7FCswT6znjuy3YDPQUDS6Dsrx2Yk5v4GH1fPc1GnktzaF5NUKC2K'
  readonly HEADER_API_KEY = 'x-api-key'
  readonly API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_DzObmDHUc5ku7FCswT6znjuy3YDPQUDS6Dsrx2Yk5v4GH1fPc1GnktzaF5NUKC2K'

  cats: Cat[] = []

  constructor(private router: Router, private httpClient: HttpClient) {
    this.httpClient.get<Cat[]>(this.API_URL).subscribe((cats: Cat[]) => {
      this.cats = cats
      console.log(this.cats);
      
    })
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }
}

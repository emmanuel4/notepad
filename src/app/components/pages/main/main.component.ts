import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    const promise = this.apiService.logout();
    promise.then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error(error)
    })
  }

}

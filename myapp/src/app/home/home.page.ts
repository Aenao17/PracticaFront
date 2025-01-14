import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    private auth: AuthService,
    private router: Router,
    private navCtrl: NavController)
  {}

  startQuiz() {
    this.router.navigate(['/quiz']);
  }


  async logout() {
    await this.auth.logout();
  }

}

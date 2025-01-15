import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IonicModule, NavController} from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule,
    IonicModule,
    NgIf
  ]
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    console.log(this.username);
  }

  async login() {
    try {
      const response = await this.auth.login(this.username, this.password) as any;
      await this.storage.set("_token", response.token);
      this.navCtrl.navigateRoot("/home");
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Login failed. Please check your credentials and try again.';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import {IonicModule, NavController} from '@ionic/angular';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [
    FormsModule,
    IonicModule
  ]
})
export class SignupPage implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    console.log("SignUp");
  }

  signup(): void {
    this.auth.signup(this.username, this.password, this.email, this.password).then(() => {
      this.navCtrl.navigateRoot("/login");
    }).catch(() => {
      this.errorMessage = 'Signup failed. Please try again.';
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {FormService} from "../../services/form.service";
import {AuthService} from "../../services/auth.service";
import {IonicModule, NavController} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  imports: [
    IonicModule,
    NgForOf
  ]
})
export class LeaderboardPage implements OnInit {

  protected leaderboard: any = [];

  constructor(private formservice: FormService,
              private auth: AuthService,
              private navCtrl: NavController) { }

  async ngOnInit() {
    this.leaderboard = await this.formservice.getLeaderboard();
    if (this.leaderboard.length > 0) {
      this.sortLeaderboard();
    } else {
      console.warn("No users found in leaderboard.");
    }
  }

  returnHome(){
    this.navCtrl.navigateRoot('/home');
  }

  sortLeaderboard() {
    this.leaderboard.sort((a: any, b: any) => a.score - b.score);
  }

}

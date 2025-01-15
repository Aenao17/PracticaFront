import { Component, OnInit } from '@angular/core';
import {IonicModule, NavController} from "@ionic/angular";
import {FormService} from "../../services/form.service";
import {AuthService} from "../../services/auth.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgForOf
  ]
})
export class QuizPage implements OnInit {
  protected quiz: any = [];
  private index: number = 0;
  protected question: any = "";
  protected selectedAnswer: any = null;
  public answers: any = [];
  public score: any = null;
  public isComplete: boolean = false;
  public ai: any = null;

  constructor(
    private formservice: FormService,
    private auth: AuthService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.quiz = await this.formservice.getForm();
    if (this.quiz.length > 0) {
      this.displayQuestion();
    } else {
      console.warn("No questions found in quiz.");
    }
  }

  saveAnswer() {
    this.answers[this.index] = this.selectedAnswer || null;
  }

  nextQuestion() {
    if (this.index < this.quiz.length - 1) {
      this.saveAnswer();
      this.index++;
      this.selectedAnswer = null;
      this.displayQuestion();
    }else{
      alert("You have reached the end of the quiz");
    }
  }

  previousQuestion() {
    if (this.index > 0) {
      this.index--;
      this.displayQuestion();
    }
  }

  async displayQuestion() {
    if (this.quiz.length === 0) {
      this.question = "No questions available.";
      return;
    }
    if (this.index >= 0 && this.index < this.quiz.length) {
      this.question = this.quiz[this.index];
      this.selectedAnswer = this.answers[this.index] || null;
    } else {
      console.error("Invalid question index:", this.index);
    }
  }

  async submit() {
    this.saveAnswer(); // Ensure the last answer is saved
    const resp = await this.formservice.submitForm(this.answers);
    this.score = resp;
    this.isComplete = true;
    const aii:any = await this.formservice.getAI(this.answers);
    this.ai=aii.recommendation
  }

  returnHome(){
    this.navCtrl.navigateRoot('/home');
  }
}

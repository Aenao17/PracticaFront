import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})

export class FormService {
  private apiUrl = `${environment.apiUrl}/form`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  async getForm() {
    const quiz = await lastValueFrom(this.http.get(`${this.apiUrl}`));
    return quiz;
  }

  async submitForm(answers: any) {
    const response = await lastValueFrom(this.http.post(`${this.apiUrl}`, answers));
    return response;
  }
}

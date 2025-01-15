import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment.prod";
import {AuthService} from "./auth.service";
import {StorageService} from "./storage.service";

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
    const username = this.auth.getUsername();

    const user:any  = await this.auth.getByUsername(username);

    const response = await lastValueFrom(this.http.post(`${this.apiUrl}/${user.id}`, answers));
    return response;
  }
}

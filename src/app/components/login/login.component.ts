import { LoginService } from './../../services/login-service/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isEmailError: boolean = false;
  isPasswordError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ngFireAuth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async loginUser() {
    const manager = this.loginForm.value;
    const userCredentials = await this.ngFireAuth
      .signInWithEmailAndPassword(manager.email, manager.password)
      .catch((err: HttpErrorResponse) => {
        this.giveUserFeedback(err.message);
        return null;
      });
    if (userCredentials) {
      this.loginService
        .getManagerId(userCredentials.user.email)
        .subscribe((managerId) => {
          window.sessionStorage.setItem('managerId', managerId);
          this.router.navigate(['home']);
        });
    }
  }

  private giveUserFeedback(errorMessage: string) {
    const myH1: HTMLHeadingElement = document.querySelector('h1');
    console.log(myH1.innerHTML);
    const isPasswordWrong: boolean = errorMessage.includes('password');
    const emailEl: HTMLInputElement = document.querySelector('#email');
    const passwordEl: HTMLInputElement = document.querySelector('#password');
    if (isPasswordWrong) {
      this.isPasswordError = true;
      passwordEl.style.border = '1px solid red';
      passwordEl.style.boxShadow = '0px 0px 5px red';
      this.isEmailError = false;
      emailEl.style.border = '';
      emailEl.style.boxShadow = '';
    } else {
      this.isPasswordError = false;
      passwordEl.style.border = '';
      passwordEl.style.boxShadow = '';
      this.isEmailError = true;
      emailEl.style.border = '1px solid red';
      emailEl.style.boxShadow = '0px 0px 5px red';
    }
  }
}

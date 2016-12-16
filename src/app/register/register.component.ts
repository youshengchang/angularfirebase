import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) { 

        this.form = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
          confirm: ['', Validators.required]
        })

  }

  ngOnInit() {
  }

  isPasswordMatch(){
    const val = this.form.value;
    return val && val.password && val.password == val.confirm;
  }

  signUp(){
    const val = this.form.value;
    this.authService.signUp(val.email, val.password)
        .subscribe(
          () => {
            alert('User created successfully!');
            this.router.navigateByUrl('/home');
          },
          err => alert(err)

        );
  }

}

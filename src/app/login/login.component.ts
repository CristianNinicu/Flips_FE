import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { SnackMessageService } from '../snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {ControlCounterService} from '../control-counter.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatButton
  ]
})
export class LoginComponent implements OnInit {
    public saving!: boolean;
    public loginForm!: FormGroup;

    constructor(private authService: AuthService,
                private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute,
                private counterService: ControlCounterService) {
    }

    public ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }

  public async submit(e: Event) {
    this.snack.clear();
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      this.snack.showErrorMessage('Check the form before submitting.');
      return;
    }

    this.saving = true;

    try {
      await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );

      const returnUrl = this.actr.snapshot.queryParams['returnUrl'];
      await this.router.navigate(returnUrl ? [returnUrl] : ['/home']);
      this.snack.display('Logged in successfully!');
    } catch (e) {
      this.snack.showError((e as Error).message);
    }

    this.saving = false;
  }
}

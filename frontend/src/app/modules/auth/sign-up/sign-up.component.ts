import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { VariableServiceService } from 'app/variable-service.service';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    users:any;

    /**
     * Constructor
     */
    constructor(
        private param: VariableServiceService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private http: HttpClient
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                nom      : ['', Validators.required],
                prenom      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                password  : [''],
                role_id   : [''],
                statut   : [1],
                numero: ['', Validators.required]
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        const httpOptions={
            headers: new HttpHeaders({
              'Accept': 'application/json'
            })
        };
      
        this.http.post(this.param.url+'/registerUser',this.signUpForm.value).subscribe(data=>{
            this.users = data;

            if(this.users>=1){
                this.signUpForm.enable();
                // Reset the form
                this.signUpNgForm.resetForm();
                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Cet utilisateur existe déjà.'
                };
                // Show the alert
                this.showAlert = true;
            }           
            else{
                this.showAlert = false;
                this.signUpForm.enable();
                // Reset the form
                this.signUpNgForm.resetForm();
                // this._router.navigateByUrl('dashboards/dashboard');
            }
            // window.location.reload();
        })
    }
}

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { VariableServiceService } from 'app/variable-service.service';
@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    usr: any;
    /**
     * Constructor
     */
    constructor(
        private param: VariableServiceService,
        private _activatedRoute: ActivatedRoute,
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
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        if ( this.signInForm.invalid ){return;}
        this.signInForm.disable();
        this.showAlert = false;
        const httpOptions={headers: new HttpHeaders({'Accept': 'application/json'})};
        this.http.post(this.param.url+'/login',this.signInForm.value,httpOptions).subscribe(data=>{
            this.usr=data;
            localStorage.setItem('usr_id',this.usr.id);
            localStorage.setItem('usr_nom',this.usr.nom);
            localStorage.setItem('usr_prenom',this.usr.prenom);
            localStorage.setItem('usr_email',this.usr.email);
            localStorage.setItem('usr_role',this.usr.niveau);
            localStorage.setItem('usr_numero',this.usr.numero);
            localStorage.setItem('usr_libellerole',this.usr.libellerole);
            localStorage.setItem('usr_role_id',this.usr.role_id);
            if(this.usr != 0)
            {
                this._router.navigateByUrl('dashboards/dashboard');
            }else{
                // this._router.navigateByUrl('dashboards/dashboard1');

                this.signInForm.enable();
                this.signInNgForm.resetForm();
                this.alert = {
                    type   : 'error',
                    message: 'Email ou Mot de passe incorrect'
                };
                this.showAlert = true;
            }
        });
        
    }
}

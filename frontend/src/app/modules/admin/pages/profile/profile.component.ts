import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariableServiceService } from 'app/variable-service.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    @ViewChild('updateProfileNgForm') updateProfileNgForm: NgForm;
    @ViewChild('updatePasswordNgForm') updatePasswordNgForm: NgForm;

    updateProfileForm: FormGroup;
    updatePasswordForm: FormGroup;
    datas: any;
    user: any = {
        role_id: localStorage.getItem('usr_role_id'),
        nom: localStorage.getItem('usr_nom'),
        prenom: localStorage.getItem('usr_prenom'),
        email: localStorage.getItem('usr_email'),
        contact: localStorage.getItem('usr_numero'),
        poste: localStorage.getItem('usr_libellerole'),
        avatar: '',
    };

    password: any = {
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
    };
    /**
     * Constructor
     */
    constructor(
        private param: VariableServiceService,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private http: HttpClient,
        private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        // Update user form
        this.updateProfileForm = this._formBuilder.group({
            user_id: [localStorage.getItem('usr_id')],
            nom: [localStorage.getItem('usr_nom'), Validators.required],
            prenom: [localStorage.getItem('usr_prenom'), Validators.required],
            email: [localStorage.getItem('usr_email'), [Validators.required, Validators.email]],
            numero: [localStorage.getItem('usr_numero'), Validators.required],
        });

        this.user.nom = localStorage.getItem('usr_nom');
        this.user.prenom = localStorage.getItem('usr_prenom');
        this.user.email = localStorage.getItem('usr_email');
        this.user.contact = localStorage.getItem('usr_numero');

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    updateProfile() {
        // return true;
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };

        this.http.post(this.param.url+'/updateuser', this.updateProfileForm.value, httpOptions).subscribe(data => {
            if (data != null) {
                this.datas = data;
                localStorage.setItem('usr_nom', this.datas.nom);
                localStorage.setItem('usr_prenom', this.datas.prenom);
                localStorage.setItem('usr_email', this.datas.email);
                localStorage.setItem('usr_numero', this.datas.numero);
                this.ngOnInit();
            }
        })
    }

    updatePassword() {
        return true;
    }
}

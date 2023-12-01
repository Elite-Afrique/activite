import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { FinanceService } from 'app/modules/admin/dashboards/finance/finance.service';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariableServiceService } from 'app/variable-service.service';

@Component({
    selector: 'finance',
    templateUrl: './finance.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class FinanceComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;

    addBesoinForm: FormGroup;

    usr_id = localStorage.getItem('usr_id');

    besoinCount: any = {
        valider: 0,
        rejeter: 0,
        encours: 0
    };

    displayAddBesoin: any;
    displayBesoin: any;

    recentTransactionsDataSource: any;
    recentTransactionsTableColumns: string[] = ['Id', 'date', 'contenu', 'statut'];

    /**
     * Constructor
     */
    constructor(
        private param: VariableServiceService,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _financeService: FinanceService,
        private _formBuilder: FormBuilder,
        private http: HttpClient,
    ) {
        this.displayAddBesoin = false;
        this.displayBesoin = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data
        this.http.get(this.param.url+'/getbesoins').subscribe(data => {
            this.recentTransactionsDataSource = data;
            this.recentTransactionsDataSource = this.recentTransactionsDataSource.filter(task => task.user_id == this.usr_id);

            this.besoinCount.valider = this.recentTransactionsDataSource.filter(besoin => besoin.validstatut == 1).length;
            this.besoinCount.rejeter = this.recentTransactionsDataSource.filter(besoin => besoin.rejetstatut == 1).length;
            this.besoinCount.encours = this.recentTransactionsDataSource.filter(besoin => besoin.validstatut == 0 && besoin.rejetstatut == 0).length;
        })

        this.addBesoinForm = this._formBuilder.group({
            user_id: ['', Validators.required],
            body: ['', Validators.required],
            validstatut: [''],
            rejetstatut: [''],
            executstatut: [''],
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    // submit programme sup 
    submitProgrammeSup() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };

        this.addBesoinForm = this._formBuilder.group({
            user_id: [this.usr_id, Validators.required],
            body: [this.addBesoinForm.controls['body'].value, Validators.required],
            validstatut: [0],
            rejetstatut: [0],
            executstatut: [0],
        });

        this.http.post(this.param.url+'/addbesoins', this.addBesoinForm.value, httpOptions).subscribe(data => { 
            if (data != null) {
                this.ngOnInit();
            }
        })
        this.addBesoinForm.reset();
        this.closePopup();
    }

    openPopup() {
        this.displayAddBesoin = true;
        this.displayBesoin = false;
    }
    closePopup() {
        this.displayAddBesoin = false;
        this.displayBesoin = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    // /**
    //  * On destroy
    //  */
    // ngOnDestroy(): void
    // {
    //     // Unsubscribe from all subscriptions
    //     this._unsubscribeAll.next(null);
    //     this._unsubscribeAll.complete();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    // trackByFn(index: number, item: any): any
    // {
    //     return item.id || index;
    // }

}

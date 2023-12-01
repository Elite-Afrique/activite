import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { ProjectService } from 'app/modules/admin/dashboards/project/project.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fuseAnimations } from '@fuse/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from 'app/modules/admin/dashboards/finance/finance.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { FuseAlertType } from '@fuse/components/alert';
import { VariableServiceService } from 'app/variable-service.service';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations
})
export class ProjectComponent implements OnInit, OnDestroy {
    @ViewChild('addProgramNgForm') addProgramNgForm: NgForm;
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    addProgramForm: FormGroup;
    updateProgramForm: FormGroup;
    updateProfileForm: FormGroup;
    alldaysweek: any;
    actualweekdata: any;
    lastweekdata: any;
    allusers: any;
    activities: any;

    allprogrammes: any;
    allprogramme: any;
    TitreProgramme: any;
    actualprogram: any;
    programdetail: any;
    userdetail: any;
    actualprogramprogress: any;
    programTableColumns: string[] = ['nom_prenom', 'tache', 'date', 'statut'];
    titre_id: any;
    activite_id: any;
    activite: any;
    roles: any;
    user_id: any;
    selectedIndex: any;
    usr_role: any = localStorage.getItem('usr_role');
    date_exec: any;
    statistiq: any = {
        personalCount: 0,
        activiteCount: 0,
        besoinExCount: 0,
        tacheNvlCount: 0
    };
    detail_id: any = {
        user: 0,
        programme: 0,
        rapport: 0,
        besoin: 0
    };
    besoinExCount: any;
    displayAddProgramme: any;
    displayDetailActivite: any;
    displayDetailUser: any;
    displayAddUser: any;
    displayProgramme: any;
    displayUsers: any;
    displayCurrentProgramme: any;
    displayMatLabel: any;

    signUpForm: FormGroup;
    showAlert: boolean = false;
    users: any;

    /**
     * Constructor
     */
    constructor(
        private param: VariableServiceService,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _projectService: ProjectService,
        private _router: Router,
        private http: HttpClient,
        private _formBuilder: FormBuilder,
        private _financeService: FinanceService

    ) {
        this.displayAddProgramme = false;
        this.displayDetailActivite = false;
        this.displayDetailUser = false;
        this.displayCurrentProgramme = false;
        this.displayAddUser = false;
        this.displayProgramme = true;
        this.displayUsers = true;
        this.displayMatLabel = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if (this.usr_role == 1) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex = 1;
            this.displayMatLabel = false;
        }

        // Get the data
        this.http.get(this.param.url+'/getdaylyprogramprogress').subscribe(data3 => {
        });
        this.http.get(this.param.url+'/getactualprogramprogres').subscribe(data => {
            this.actualprogramprogress = data;
        });
        this.http.get(this.param.url+'/getbesoins').subscribe(data => {
            this.besoinExCount = data;
            this.statistiq.besoinExCount = this.besoinExCount.filter(besoin => besoin.validstatut == 0 && besoin.rejetstatut == 0).length;
        });
        this.http.get(this.param.url+'/getactualweekdatas').subscribe(data => {
            this.actualweekdata = data;

            this.http.get(this.param.url+'/getlastweekdatas').subscribe(data1 => {
                this.lastweekdata = data1;

                // Github issues
                this.chartGithubIssues = {
                    chart: {
                        fontFamily: 'inherit',
                        foreColor: 'inherit',
                        height: '100%',
                        type: 'line',
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    colors: ['#305ae4', '#94A3B8'],
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [0],
                        background: {
                            borderWidth: 0
                        }
                    },
                    grid: {
                        borderColor: 'var(--fuse-border)'
                    },
                    labels: this.alldaysweek,
                    legend: {
                        show: false
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%'
                        }
                    },
                    series: [
                        {
                            name: 'Actuel',
                            type: 'line',
                            data: this.actualweekdata
                        },
                        {
                            name: 'Précédent',
                            type: 'column',
                            data: this.lastweekdata
                        }
                    ],
                    states: {
                        hover: {
                            filter: {
                                type: 'darken',
                                value: 0.75
                            }
                        }
                    },
                    stroke: {
                        width: [3, 0]
                    },
                    tooltip: {
                        followCursor: true,
                        theme: 'dark'
                    },
                    xaxis: {
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            color: 'var(--fuse-border)'
                        },
                        labels: {
                            style: {
                                colors: 'var(--fuse-text-secondary)'
                            }
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    yaxis: {
                        labels: {
                            offsetX: -16,
                            style: {
                                colors: 'var(--fuse-text-secondary)'
                            }
                        }
                    }
                };
            });
        });
        this.http.get(this.param.url+'/getallweekdays').subscribe(data => {
            this.alldaysweek = data;
        });
        this.http.get(this.param.url+'/getallusers').subscribe(data => {
            this.allusers = data;
            this.statistiq.personalCount = this.allusers.length;
        });
        // this.http.get(this.param.url+'/getallprogramme').subscribe(data => {
        //     this.allprogrammes = data;
        // });
        this.http.get(this.param.url+'/getallprogrammes').subscribe(data => {
            this.allprogrammes = data;
            this.allprogramme = data;
            this.statistiq.tacheNvlCount = this.allprogramme.filter(besoin => besoin.statut == 0 && besoin.halfstatut == 0).length;
        });
        this.http.get(this.param.url+'/getweek').subscribe(data => {
            this.TitreProgramme = data;
        });
        this.http.get(this.param.url+'/getroles').subscribe(data => {
            this.roles = data;
        });
        // Create program form
        this.addProgramForm = this._formBuilder.group({
            titre_id: ['', Validators.required],
            userid: ['', Validators.required],
            activite_id: ['', Validators.required],
            date: [''],
            statut: [''],
            halfstatut: [''],
            activite_sup: [''],
        });
        // Create user form
        this.signUpForm = this._formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            role_id: [''],
            statut: [1],
            numero: ['', Validators.required]
        });
        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };
        // Get the activities
        this.http.get(this.param.url+'/getrapport').subscribe(data => {
            this.activities = data;
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };

        this.http.post(this.param.url+'/registerUser', this.signUpForm.value).subscribe(data => {
            this.users = data;
            if (this.users >= 1) {
                this.signUpForm.enable();
                // Reset the form
                this.signUpNgForm.resetForm();
                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Cet utilisateur existe déjà.'
                };
                // Show the alert
                this.showAlert = true;
            }
            else {
                this.showAlert = false;
                this.ngOnInit();
                this.signUpForm.reset();
                this.signUpForm.enable();
                // this.signUpNgForm.resetForm();
            }
            // window.location.reload();
            if (data != null) {
                this.closePopup();
            }
        });
    };

    getProgram($id) {
        this.http.get(this.param.url+'/getactualprogram/' + $id).subscribe(data => {
            this.displayCurrentProgramme = true;
            this.displayProgramme = false;
            this.actualprogram = data as any[];
            this.actualprogram.forEach(p => {
                let nbr = 0;
                if (p['nbr'] != -1)
                    this.actualprogram.forEach(pp => {
                        if (p.user_id == pp.user_id) {
                            nbr++;
                            if (nbr > 1) {
                                pp['nbr'] = -1;
                            }
                        }
                    })
                p['nbr'] = nbr;
            });

        }, err => { console.log(err) });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    };

    detailactivite($id) {
        this.http.get(this.param.url+'/getprogramactbyid/' + $id).subscribe(data => {
            this.programdetail = data;
            this.detail_id.programme = $id;
            // Update program form
            this.updateProgramForm = this._formBuilder.group({
                userid: [this.programdetail.user_id],
                activite_id: [this.programdetail.libelleactivite],
                date: [this.programdetail.date],
                id: [this.programdetail.id],
            });
            if(this.programdetail =! null && this.programdetail.statut == 0 && this.programdetail.halfstatut == 0 && this.programdetail.activite_sup == 0){
                this.displayDetailActivite = true;
                this.displayCurrentProgramme = false;
            }
        }, err => { console.log(err) });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    detailuser($id) {
        this.http.get(this.param.url+'/getuserbyid/' + $id).subscribe(data => {
            this.userdetail = data;
            this.detail_id.user = $id;
            // Update user form
            this.updateProfileForm = this._formBuilder.group({
                id: [this.userdetail.id],
                nom: [this.userdetail.nom],
                prenom: [this.userdetail.prenom],
                email: [this.userdetail.email],
                numero: [this.userdetail.numero],
                role_id: [this.userdetail.role_id],
            });
            if(this.userdetail =! null){
                this.displayDetailUser = true;
                this.displayUsers = false;
            }
        }, err => { console.log(err) });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    updateProgramme() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };

        this.http.post(this.param.url+'/updateprogramme', this.updateProgramForm.value, httpOptions).subscribe(data => {
            if (data != null) {
                this.closedetail();
                this.closePopup()
                this.ngOnInit();
                this.programdetail = data as any[];
                this.getProgram(this.programdetail.titre_id);
            }
        })

        this._changeDetectorRef.markForCheck();
    }

    updateUser() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };
        
        this.http.post(this.param.url+'/updateprofile', this.updateProfileForm.value, httpOptions).subscribe(data => {
            if (data != null) {
                this.displayDetailUser = false;
                this.ngOnInit();
                this.userdetail = data as any[];
                this.detailuser(this.userdetail.id);
            }
        })

        this._changeDetectorRef.markForCheck();
    }

    deleteProgramme($id) {
        this.http.get(this.param.url+'/delprogramme/' + $id).subscribe(data => {
            if (data != null) {
                this.closedetail();
                this.closePopup()
                this.ngOnInit();
                this.programdetail = data;
                // console.log(this.programdetail.titre_id);
                this.getProgram(this.programdetail.titre_id);
            }
        })

        this._changeDetectorRef.markForCheck();
    }

    deleteUser($id) {
        this.http.get(this.param.url+'/deluser/' + $id).subscribe(data => {
            if (data != null) {
                this.displayDetailUser = false;
                this.closePopup()
                this.ngOnInit();
            }
        })

        this._changeDetectorRef.markForCheck();
    }

    closedetail(){
        this.displayDetailActivite = false;
        this.displayCurrentProgramme = true;
    }

    redirectTo() {
        this._router.navigateByUrl('dashboards/rapports');
    };

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }

    // Start popup
    openPopup() {
        this.displayAddProgramme = true;
        this.displayProgramme = false;
    }
    openPopup1() {
        this.displayCurrentProgramme = true;
        this.displayProgramme = false;
    }
    openPopup2() {
        this.displayAddUser = true;
        this.displayUsers = false;
    }
    closePopup() {
        this.displayAddProgramme = false;
        this.displayDetailUser = false;
        this.displayCurrentProgramme = false;
        this.displayAddUser = false;
        this.displayProgramme = true;
        this.displayUsers = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    // End popup

    submitProgramme() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };

        this.user_id = this.addProgramForm.controls['userid'].value;
        this.date_exec = this.addProgramForm.controls['date'].value;
        this.activite = this.addProgramForm.controls['activite_id'].value;

        this.http.post(this.param.url+'/createtitreprogramme', { "titreprogramme": this.TitreProgramme, "progress": 0 }, httpOptions).subscribe(data => {
            this.titre_id = data;

            if (this.titre_id != null) {
                this.http.post(this.param.url+'/createactivite', { "libelleactivite": this.activite }, httpOptions).subscribe(data => {
                    this.activite_id = data;

                    if (this.activite_id != null) {
                        this.addProgramForm = this._formBuilder.group({
                            titre_id: [this.titre_id, Validators.required],
                            user_id: [this.user_id, Validators.required],
                            activite_id: [this.activite_id, Validators.required],
                            date: [this.date_exec, Validators.required],
                            statut: [0],
                            halfstatut: [0],
                            activite_sup: [0],
                        });

                        this.http.post(this.param.url+'/createprogramme', this.addProgramForm.value, httpOptions).subscribe(data => {
                            if (data != null) {

                                this.http.get(this.param.url+'/getprogramprogres/' + this.titre_id).subscribe(data => {
                                    if (data != null) {
                                        this.ngOnInit();
                                    }
                                });
                            }
                        })
                    }
                })
            }
        });
        this.addProgramForm.reset();
        // Mark for check
        this._changeDetectorRef.markForCheck();
        this.closePopup();
    }

    /**
     * Returns whether the given dates are different days
     *
     * @param current
     * @param compare
    */
    isSameDay(current: string, compare: string): boolean {
        return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
    }
    /**
     * Get the relative format of the given date
     *
     * @param date
     */
    getRelativeFormat(date: string): string {
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');

        // Is today?
        if (moment(date, moment.ISO_8601).isSame(today, 'day')) {
            return 'Aujourd\'hui';
        }

        // Is yesterday?
        if (moment(date, moment.ISO_8601).isSame(yesterday, 'day')) {
            return 'Hier';
        }

        return moment(date, moment.ISO_8601).fromNow();
    }

}

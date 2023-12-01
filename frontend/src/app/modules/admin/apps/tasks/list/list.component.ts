import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Tag, Task } from 'app/modules/admin/apps/tasks/tasks.types';
import { TasksService } from 'app/modules/admin/apps/tasks/tasks.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VariableServiceService } from 'app/variable-service.service';

@Component({
    selector       : 'tasks-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';
    selectedTask: Task;
    // tags: Tag[];
    tasks: any;
    tasksCount: any = {
        completed : 0,
        incomplete: 0,
        total     : 0
    };
    curentTask:any;
    addRapportForm: FormGroup;
    addProgramForm: FormGroup;

    usr_id = localStorage.getItem('usr_id');

    displayAddActivite:any;
    displayActivite:any;
    displayCurrentActivite:any;
    displayActiviteSup:any;
    pipe = new DatePipe('en-US');
    today = new Date();
    activite_id:any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private param: VariableServiceService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _tasksService: TasksService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private http: HttpClient,
        private _formBuilder: FormBuilder,

    )
    {
        this.displayAddActivite = false;
        this.displayCurrentActivite = false;
        this.displayActiviteSup = false;
        this.displayActivite = true;
    }

    // Start popup
    openPopup() {
        this.displayCurrentActivite = true;
        this.displayActivite = false;
    }
    openPopup1() {
        this.displayAddActivite = true;
        this.displayActivite = false;
    }
    openPopup2() {
        this.displayActiviteSup = true;
        this.displayActivite = false;
    }
    closePopup() {
        this.displayAddActivite = false;
        this.displayCurrentActivite = false;
        this.displayActiviteSup = false;
        this.displayActivite = true;
    }
    // End popup

    // get current tasks
    getCurentTask(task_id:any, usr_id:any){
        this.curentTask = this.tasks.filter(task => task.user_id == usr_id && task.id == task_id);
        this.openPopup();
    }
    // submit Rapports
    sendRapport(task_id:any, titre_id:any){
        this.addRapportForm = this._formBuilder.group({
            prog_id      : [task_id,Validators.required],
            usr_id      : [this.usr_id,Validators.required],
            body : [this.addRapportForm.controls['body'].value,Validators.required],
        });

        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };

        this.http.post(this.param.url+'/addrapport', this.addRapportForm.value, httpOptions).subscribe(data => {
            this.http.get(this.param.url+'/validehalfactivite/'+task_id).subscribe(data1 => {
                if(data1 != null){
                    this.ngOnInit();
                    this.http.get(this.param.url+'/getprogramprogres/'+titre_id).subscribe(data2 => {
                        this.http.get(this.param.url+'/getdaylyprogramprogress').subscribe(data3=>{
                        })
                    })
                }
            });
        })

        this._changeDetectorRef.markForCheck();
        this.closePopup();
    }
    // submit programme sup 
    submitProgrammeSup() {
    
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };
    
        this.http.post(this.param.url+'/createactivite', {"libelleactivite":this.addProgramForm.controls['activite_id'].value}, httpOptions).subscribe(data1 => {
            this.activite_id = data1;  

            if(this.activite_id != null){
                this.addProgramForm = this._formBuilder.group({
                    titre_id      : [this.tasks[0].titre_id,Validators.required],
                    user_id      : [this.usr_id,Validators.required],
                    activite_id : [this.activite_id,Validators.required],
                    date: [this.pipe.transform(this.today, 'YYYY-MM-dd'),Validators.required],
                    statut: [1],
                    halfstatut: [0],
                    activite_sup: [1],
                });

                this.http.post(this.param.url+'/createprogramme', this.addProgramForm.value, httpOptions).subscribe(data => {
                    if(data != null){

                        this.http.get(this.param.url+'/getprogramprogres/'+this.tasks[0].titre_id).subscribe(data2 => {
                            if(data2 != null){
                                this.addProgramForm.reset();
                                this.ngOnInit();                                    
                            }
                        });
                    }
                    this.closePopup();
                    this.ngOnInit();                                    
                    // this.addProgramNgForm.resetForm();
                })
            }
        })
        this.closePopup
        this.addProgramForm.reset();    
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(){

        this.addProgramForm = this._formBuilder.group({
            titre_id      : ['',Validators.required],
            userid      : ['',Validators.required],
            activite_id : ['',Validators.required],
            date: [''],
            statut: [''],
            halfstatut: [''],
            activite_sup: [''],
        });
        
        this.http.get(this.param.url+'/getuserprogramme').subscribe(data=>{
            this.tasks = data;
            this.tasks = this.tasks.filter(task => task.user_id == this.usr_id );
            this.tasksCount.total = this.tasks.filter(task => task.user_id == this.usr_id ).length;
            this.tasksCount.completed = this.tasks.filter(task => task.user_id == this.usr_id && task.statut == 1 || task.halfstatut == 1).length;
            this.tasksCount.incomplete = this.tasksCount.total - this.tasksCount.completed;

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // Update the count on the navigation
            setTimeout(() => {

                // Get the component -> navigation data -> item
                const mainNavigationComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

                // If the main navigation component exists...
                if ( mainNavigationComponent )
                {
                    const mainNavigation = mainNavigationComponent.navigation;
                    const menuItem = this._fuseNavigationService.getItem('apps.tasks', mainNavigation);
                    // Refresh the navigation
                    mainNavigationComponent.refresh();
                }
            });

            this.addProgramForm = this._formBuilder.group({
                titre_id      : [this.tasks[0].titre_id,Validators.required],
                user_id      : [this.usr_id,Validators.required],
                activite_id : ['',Validators.required],
                date: [this.pipe.transform(this.today, 'YYYY-MM-dd'),Validators.required],
                statut: [1],
                halfstatut: [0],
                activite_sup: [1],
            });
        })

        this.addRapportForm = this._formBuilder.group({
            prog_id      : ['',Validators.required],
            user_id      : ['',Validators.required],
            body : ['',Validators.required],
        });

        // Get the tags
        this._tasksService.tags$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tags: Tag[]) => {
                // this.tags = tags;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the task
        this._tasksService.task$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((task: Task) => {
                this.selectedTask = task;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {

                // Calculate the drawer mode
                this.drawerMode = state.matches ? 'side' : 'over';

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(event =>
                    (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                    && (event.key === '/' || event.key === '.') // '/' or '.' key
                )
            )
            .subscribe((event: KeyboardEvent) => {

                // If the '/' pressed
                if ( event.key === '/' )
                {
                    this.createTask('task');
                }

                // If the '.' pressed
                if ( event.key === '.' )
                {
                    this.createTask('section');
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create task
     *
     * @param type
     */
    createTask(type: 'task' | 'section'): void
    {
        // Create the task
        this._tasksService.createTask(type).subscribe((newTask) => {

            // Go to the new task
            this._router.navigate(['./', newTask.id], {relativeTo: this._activatedRoute});

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Toggle the completed status
     * of the given task
     *
     * @param task
     */
    toggleCompleted(id:any, titre_id:any)
    {
        this.http.get(this.param.url+'/valideactivite/'+id).subscribe(data => {
            if(data = 1){
                this.ngOnInit();
                this.http.get(this.param.url+'/getprogramprogres/'+titre_id).subscribe(data => {
                    this.http.get(this.param.url+'/getdaylyprogramprogress').subscribe(data1=>{
                    })
                })
            }
        })

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Task dropped
     *
     * @param event
     */
    dropped(event: CdkDragDrop<Task[]>): void
    {
        // Move the item in the array
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        // Save the new order
        this._tasksService.updateTasksOrders(event.container.data).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}

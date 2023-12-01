import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FileManagerListComponent } from 'app/modules/admin/apps/file-manager/list/list.component';
import { FileManagerService } from 'app/modules/admin/apps/file-manager/file-manager.service';

@Component({
  selector: 'app-docform',
  templateUrl: './docform.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocformComponent implements OnInit {

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fileManagerListComponent: FileManagerListComponent,
    private _fileManagerService: FileManagerService
  ) { }

  ngOnInit(): void {
    // Open the drawer
    this._fileManagerListComponent.matDrawer.open();
  }

  /**
  * Close the drawer
  */
  closeDrawer(): Promise<MatDrawerToggleResult>
  {
      return this._fileManagerListComponent.matDrawer.close();
  }

}

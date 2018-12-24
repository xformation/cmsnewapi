import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICollege } from 'app/shared/model/college.model';
import { CollegeService } from './college.service';

@Component({
    selector: 'jhi-college-delete-dialog',
    templateUrl: './college-delete-dialog.component.html'
})
export class CollegeDeleteDialogComponent {
    college: ICollege;

    constructor(private collegeService: CollegeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.collegeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'collegeListModification',
                content: 'Deleted an college'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-college-delete-popup',
    template: ''
})
export class CollegeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ college }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CollegeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.college = college;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICollegeBranches } from 'app/shared/model/college-branches.model';
import { CollegeBranchesService } from './college-branches.service';

@Component({
    selector: 'jhi-college-branches-delete-dialog',
    templateUrl: './college-branches-delete-dialog.component.html'
})
export class CollegeBranchesDeleteDialogComponent {
    collegeBranches: ICollegeBranches;

    constructor(
        private collegeBranchesService: CollegeBranchesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.collegeBranchesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'collegeBranchesListModification',
                content: 'Deleted an collegeBranches'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-college-branches-delete-popup',
    template: ''
})
export class CollegeBranchesDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ collegeBranches }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CollegeBranchesDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.collegeBranches = collegeBranches;
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

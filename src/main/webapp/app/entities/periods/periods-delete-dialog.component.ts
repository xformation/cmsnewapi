import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPeriods } from 'app/shared/model/periods.model';
import { PeriodsService } from './periods.service';

@Component({
    selector: 'jhi-periods-delete-dialog',
    templateUrl: './periods-delete-dialog.component.html'
})
export class PeriodsDeleteDialogComponent {
    periods: IPeriods;

    constructor(private periodsService: PeriodsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.periodsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'periodsListModification',
                content: 'Deleted an periods'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-periods-delete-popup',
    template: ''
})
export class PeriodsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ periods }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PeriodsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.periods = periods;
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

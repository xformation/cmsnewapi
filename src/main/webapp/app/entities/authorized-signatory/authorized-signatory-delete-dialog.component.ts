import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';
import { AuthorizedSignatoryService } from './authorized-signatory.service';

@Component({
    selector: 'jhi-authorized-signatory-delete-dialog',
    templateUrl: './authorized-signatory-delete-dialog.component.html'
})
export class AuthorizedSignatoryDeleteDialogComponent {
    authorizedSignatory: IAuthorizedSignatory;

    constructor(
        private authorizedSignatoryService: AuthorizedSignatoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.authorizedSignatoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'authorizedSignatoryListModification',
                content: 'Deleted an authorizedSignatory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-authorized-signatory-delete-popup',
    template: ''
})
export class AuthorizedSignatoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ authorizedSignatory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AuthorizedSignatoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.authorizedSignatory = authorizedSignatory;
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

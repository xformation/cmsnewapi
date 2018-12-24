import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentYear } from 'app/shared/model/student-year.model';
import { StudentYearService } from './student-year.service';

@Component({
    selector: 'jhi-student-year-delete-dialog',
    templateUrl: './student-year-delete-dialog.component.html'
})
export class StudentYearDeleteDialogComponent {
    studentYear: IStudentYear;

    constructor(
        private studentYearService: StudentYearService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentYearService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'studentYearListModification',
                content: 'Deleted an studentYear'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-year-delete-popup',
    template: ''
})
export class StudentYearDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentYear }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StudentYearDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.studentYear = studentYear;
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

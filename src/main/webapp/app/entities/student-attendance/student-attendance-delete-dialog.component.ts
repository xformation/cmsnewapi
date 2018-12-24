import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentAttendance } from 'app/shared/model/student-attendance.model';
import { StudentAttendanceService } from './student-attendance.service';

@Component({
    selector: 'jhi-student-attendance-delete-dialog',
    templateUrl: './student-attendance-delete-dialog.component.html'
})
export class StudentAttendanceDeleteDialogComponent {
    studentAttendance: IStudentAttendance;

    constructor(
        private studentAttendanceService: StudentAttendanceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentAttendanceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'studentAttendanceListModification',
                content: 'Deleted an studentAttendance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-attendance-delete-popup',
    template: ''
})
export class StudentAttendanceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentAttendance }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StudentAttendanceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.studentAttendance = studentAttendance;
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

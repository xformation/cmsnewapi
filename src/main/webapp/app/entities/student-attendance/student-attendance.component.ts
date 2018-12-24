import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudentAttendance } from 'app/shared/model/student-attendance.model';
import { Principal } from 'app/core';
import { StudentAttendanceService } from './student-attendance.service';

@Component({
    selector: 'jhi-student-attendance',
    templateUrl: './student-attendance.component.html'
})
export class StudentAttendanceComponent implements OnInit, OnDestroy {
    studentAttendances: IStudentAttendance[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private studentAttendanceService: StudentAttendanceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.studentAttendanceService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IStudentAttendance[]>) => (this.studentAttendances = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.studentAttendanceService.query().subscribe(
            (res: HttpResponse<IStudentAttendance[]>) => {
                this.studentAttendances = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStudentAttendances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudentAttendance) {
        return item.id;
    }

    registerChangeInStudentAttendances() {
        this.eventSubscriber = this.eventManager.subscribe('studentAttendanceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

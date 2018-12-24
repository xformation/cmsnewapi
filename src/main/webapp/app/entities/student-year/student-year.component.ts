import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudentYear } from 'app/shared/model/student-year.model';
import { Principal } from 'app/core';
import { StudentYearService } from './student-year.service';

@Component({
    selector: 'jhi-student-year',
    templateUrl: './student-year.component.html'
})
export class StudentYearComponent implements OnInit, OnDestroy {
    studentYears: IStudentYear[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private studentYearService: StudentYearService,
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
            this.studentYearService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IStudentYear[]>) => (this.studentYears = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.studentYearService.query().subscribe(
            (res: HttpResponse<IStudentYear[]>) => {
                this.studentYears = res.body;
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
        this.registerChangeInStudentYears();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudentYear) {
        return item.id;
    }

    registerChangeInStudentYears() {
        this.eventSubscriber = this.eventManager.subscribe('studentYearListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

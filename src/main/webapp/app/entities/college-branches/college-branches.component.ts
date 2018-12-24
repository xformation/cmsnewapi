import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICollegeBranches } from 'app/shared/model/college-branches.model';
import { Principal } from 'app/core';
import { CollegeBranchesService } from './college-branches.service';

@Component({
    selector: 'jhi-college-branches',
    templateUrl: './college-branches.component.html'
})
export class CollegeBranchesComponent implements OnInit, OnDestroy {
    collegeBranches: ICollegeBranches[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private collegeBranchesService: CollegeBranchesService,
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
            this.collegeBranchesService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICollegeBranches[]>) => (this.collegeBranches = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.collegeBranchesService.query().subscribe(
            (res: HttpResponse<ICollegeBranches[]>) => {
                this.collegeBranches = res.body;
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
        this.registerChangeInCollegeBranches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICollegeBranches) {
        return item.id;
    }

    registerChangeInCollegeBranches() {
        this.eventSubscriber = this.eventManager.subscribe('collegeBranchesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

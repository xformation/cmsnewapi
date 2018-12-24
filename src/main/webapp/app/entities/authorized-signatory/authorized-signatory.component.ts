import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';
import { Principal } from 'app/core';
import { AuthorizedSignatoryService } from './authorized-signatory.service';

@Component({
    selector: 'jhi-authorized-signatory',
    templateUrl: './authorized-signatory.component.html'
})
export class AuthorizedSignatoryComponent implements OnInit, OnDestroy {
    authorizedSignatories: IAuthorizedSignatory[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private authorizedSignatoryService: AuthorizedSignatoryService,
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
            this.authorizedSignatoryService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IAuthorizedSignatory[]>) => (this.authorizedSignatories = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.authorizedSignatoryService.query().subscribe(
            (res: HttpResponse<IAuthorizedSignatory[]>) => {
                this.authorizedSignatories = res.body;
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
        this.registerChangeInAuthorizedSignatories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAuthorizedSignatory) {
        return item.id;
    }

    registerChangeInAuthorizedSignatories() {
        this.eventSubscriber = this.eventManager.subscribe('authorizedSignatoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

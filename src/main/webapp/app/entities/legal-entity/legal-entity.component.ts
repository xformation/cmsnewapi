import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILegalEntity } from 'app/shared/model/legal-entity.model';
import { Principal } from 'app/core';
import { LegalEntityService } from './legal-entity.service';

@Component({
    selector: 'jhi-legal-entity',
    templateUrl: './legal-entity.component.html'
})
export class LegalEntityComponent implements OnInit, OnDestroy {
    legalEntities: ILegalEntity[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private legalEntityService: LegalEntityService,
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
            this.legalEntityService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ILegalEntity[]>) => (this.legalEntities = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.legalEntityService.query().subscribe(
            (res: HttpResponse<ILegalEntity[]>) => {
                this.legalEntities = res.body;
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
        this.registerChangeInLegalEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILegalEntity) {
        return item.id;
    }

    registerChangeInLegalEntities() {
        this.eventSubscriber = this.eventManager.subscribe('legalEntityListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

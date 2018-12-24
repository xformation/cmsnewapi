import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBankAccounts } from 'app/shared/model/bank-accounts.model';
import { Principal } from 'app/core';
import { BankAccountsService } from './bank-accounts.service';

@Component({
    selector: 'jhi-bank-accounts',
    templateUrl: './bank-accounts.component.html'
})
export class BankAccountsComponent implements OnInit, OnDestroy {
    bankAccounts: IBankAccounts[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private bankAccountsService: BankAccountsService,
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
            this.bankAccountsService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IBankAccounts[]>) => (this.bankAccounts = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.bankAccountsService.query().subscribe(
            (res: HttpResponse<IBankAccounts[]>) => {
                this.bankAccounts = res.body;
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
        this.registerChangeInBankAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBankAccounts) {
        return item.id;
    }

    registerChangeInBankAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('bankAccountsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

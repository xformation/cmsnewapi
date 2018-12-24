import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBankAccounts } from 'app/shared/model/bank-accounts.model';

@Component({
    selector: 'jhi-bank-accounts-detail',
    templateUrl: './bank-accounts-detail.component.html'
})
export class BankAccountsDetailComponent implements OnInit {
    bankAccounts: IBankAccounts;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bankAccounts }) => {
            this.bankAccounts = bankAccounts;
        });
    }

    previousState() {
        window.history.back();
    }
}

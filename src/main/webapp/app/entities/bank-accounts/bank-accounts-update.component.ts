import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBankAccounts } from 'app/shared/model/bank-accounts.model';
import { BankAccountsService } from './bank-accounts.service';

@Component({
    selector: 'jhi-bank-accounts-update',
    templateUrl: './bank-accounts-update.component.html'
})
export class BankAccountsUpdateComponent implements OnInit {
    private _bankAccounts: IBankAccounts;
    isSaving: boolean;

    constructor(private bankAccountsService: BankAccountsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bankAccounts }) => {
            this.bankAccounts = bankAccounts;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.bankAccounts.id !== undefined) {
            this.subscribeToSaveResponse(this.bankAccountsService.update(this.bankAccounts));
        } else {
            this.subscribeToSaveResponse(this.bankAccountsService.create(this.bankAccounts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBankAccounts>>) {
        result.subscribe((res: HttpResponse<IBankAccounts>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get bankAccounts() {
        return this._bankAccounts;
    }

    set bankAccounts(bankAccounts: IBankAccounts) {
        this._bankAccounts = bankAccounts;
    }
}

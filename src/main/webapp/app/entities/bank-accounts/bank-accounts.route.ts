import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankAccounts } from 'app/shared/model/bank-accounts.model';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsComponent } from './bank-accounts.component';
import { BankAccountsDetailComponent } from './bank-accounts-detail.component';
import { BankAccountsUpdateComponent } from './bank-accounts-update.component';
import { BankAccountsDeletePopupComponent } from './bank-accounts-delete-dialog.component';
import { IBankAccounts } from 'app/shared/model/bank-accounts.model';

@Injectable({ providedIn: 'root' })
export class BankAccountsResolve implements Resolve<IBankAccounts> {
    constructor(private service: BankAccountsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bankAccounts: HttpResponse<BankAccounts>) => bankAccounts.body));
        }
        return of(new BankAccounts());
    }
}

export const bankAccountsRoute: Routes = [
    {
        path: 'bank-accounts',
        component: BankAccountsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-accounts/:id/view',
        component: BankAccountsDetailComponent,
        resolve: {
            bankAccounts: BankAccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-accounts/new',
        component: BankAccountsUpdateComponent,
        resolve: {
            bankAccounts: BankAccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-accounts/:id/edit',
        component: BankAccountsUpdateComponent,
        resolve: {
            bankAccounts: BankAccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankAccountsPopupRoute: Routes = [
    {
        path: 'bank-accounts/:id/delete',
        component: BankAccountsDeletePopupComponent,
        resolve: {
            bankAccounts: BankAccountsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankAccounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

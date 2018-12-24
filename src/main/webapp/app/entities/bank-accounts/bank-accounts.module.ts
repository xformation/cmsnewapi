import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    BankAccountsComponent,
    BankAccountsDetailComponent,
    BankAccountsUpdateComponent,
    BankAccountsDeletePopupComponent,
    BankAccountsDeleteDialogComponent,
    bankAccountsRoute,
    bankAccountsPopupRoute
} from './';

const ENTITY_STATES = [...bankAccountsRoute, ...bankAccountsPopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BankAccountsComponent,
        BankAccountsDetailComponent,
        BankAccountsUpdateComponent,
        BankAccountsDeleteDialogComponent,
        BankAccountsDeletePopupComponent
    ],
    entryComponents: [
        BankAccountsComponent,
        BankAccountsUpdateComponent,
        BankAccountsDeleteDialogComponent,
        BankAccountsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectBankAccountsModule {}

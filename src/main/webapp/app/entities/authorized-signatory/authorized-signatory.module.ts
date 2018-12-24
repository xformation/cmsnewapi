import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    AuthorizedSignatoryComponent,
    AuthorizedSignatoryDetailComponent,
    AuthorizedSignatoryUpdateComponent,
    AuthorizedSignatoryDeletePopupComponent,
    AuthorizedSignatoryDeleteDialogComponent,
    authorizedSignatoryRoute,
    authorizedSignatoryPopupRoute
} from './';

const ENTITY_STATES = [...authorizedSignatoryRoute, ...authorizedSignatoryPopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AuthorizedSignatoryComponent,
        AuthorizedSignatoryDetailComponent,
        AuthorizedSignatoryUpdateComponent,
        AuthorizedSignatoryDeleteDialogComponent,
        AuthorizedSignatoryDeletePopupComponent
    ],
    entryComponents: [
        AuthorizedSignatoryComponent,
        AuthorizedSignatoryUpdateComponent,
        AuthorizedSignatoryDeleteDialogComponent,
        AuthorizedSignatoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectAuthorizedSignatoryModule {}

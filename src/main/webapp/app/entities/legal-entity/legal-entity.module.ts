import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    LegalEntityComponent,
    LegalEntityDetailComponent,
    LegalEntityUpdateComponent,
    LegalEntityDeletePopupComponent,
    LegalEntityDeleteDialogComponent,
    legalEntityRoute,
    legalEntityPopupRoute
} from './';

const ENTITY_STATES = [...legalEntityRoute, ...legalEntityPopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LegalEntityComponent,
        LegalEntityDetailComponent,
        LegalEntityUpdateComponent,
        LegalEntityDeleteDialogComponent,
        LegalEntityDeletePopupComponent
    ],
    entryComponents: [LegalEntityComponent, LegalEntityUpdateComponent, LegalEntityDeleteDialogComponent, LegalEntityDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectLegalEntityModule {}

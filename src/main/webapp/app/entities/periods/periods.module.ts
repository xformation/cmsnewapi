import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    PeriodsComponent,
    PeriodsDetailComponent,
    PeriodsUpdateComponent,
    PeriodsDeletePopupComponent,
    PeriodsDeleteDialogComponent,
    periodsRoute,
    periodsPopupRoute
} from './';

const ENTITY_STATES = [...periodsRoute, ...periodsPopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PeriodsComponent,
        PeriodsDetailComponent,
        PeriodsUpdateComponent,
        PeriodsDeleteDialogComponent,
        PeriodsDeletePopupComponent
    ],
    entryComponents: [PeriodsComponent, PeriodsUpdateComponent, PeriodsDeleteDialogComponent, PeriodsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectPeriodsModule {}

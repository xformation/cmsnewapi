import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    CollegeBranchesComponent,
    CollegeBranchesDetailComponent,
    CollegeBranchesUpdateComponent,
    CollegeBranchesDeletePopupComponent,
    CollegeBranchesDeleteDialogComponent,
    collegeBranchesRoute,
    collegeBranchesPopupRoute
} from './';

const ENTITY_STATES = [...collegeBranchesRoute, ...collegeBranchesPopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CollegeBranchesComponent,
        CollegeBranchesDetailComponent,
        CollegeBranchesUpdateComponent,
        CollegeBranchesDeleteDialogComponent,
        CollegeBranchesDeletePopupComponent
    ],
    entryComponents: [
        CollegeBranchesComponent,
        CollegeBranchesUpdateComponent,
        CollegeBranchesDeleteDialogComponent,
        CollegeBranchesDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectCollegeBranchesModule {}

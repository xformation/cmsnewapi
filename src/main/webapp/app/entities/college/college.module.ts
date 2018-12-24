import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    CollegeComponent,
    CollegeDetailComponent,
    CollegeUpdateComponent,
    CollegeDeletePopupComponent,
    CollegeDeleteDialogComponent,
    collegeRoute,
    collegePopupRoute
} from './';

const ENTITY_STATES = [...collegeRoute, ...collegePopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CollegeComponent,
        CollegeDetailComponent,
        CollegeUpdateComponent,
        CollegeDeleteDialogComponent,
        CollegeDeletePopupComponent
    ],
    entryComponents: [CollegeComponent, CollegeUpdateComponent, CollegeDeleteDialogComponent, CollegeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectCollegeModule {}

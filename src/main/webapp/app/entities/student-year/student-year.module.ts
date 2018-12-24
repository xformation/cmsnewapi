import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    StudentYearComponent,
    StudentYearDetailComponent,
    StudentYearUpdateComponent,
    StudentYearDeletePopupComponent,
    StudentYearDeleteDialogComponent,
    studentYearRoute,
    studentYearPopupRoute
} from './';

const ENTITY_STATES = [...studentYearRoute, ...studentYearPopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentYearComponent,
        StudentYearDetailComponent,
        StudentYearUpdateComponent,
        StudentYearDeleteDialogComponent,
        StudentYearDeletePopupComponent
    ],
    entryComponents: [StudentYearComponent, StudentYearUpdateComponent, StudentYearDeleteDialogComponent, StudentYearDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectStudentYearModule {}

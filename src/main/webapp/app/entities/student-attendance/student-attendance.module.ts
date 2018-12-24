import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    StudentAttendanceComponent,
    StudentAttendanceDetailComponent,
    StudentAttendanceUpdateComponent,
    StudentAttendanceDeletePopupComponent,
    StudentAttendanceDeleteDialogComponent,
    studentAttendanceRoute,
    studentAttendancePopupRoute
} from './';

const ENTITY_STATES = [...studentAttendanceRoute, ...studentAttendancePopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentAttendanceComponent,
        StudentAttendanceDetailComponent,
        StudentAttendanceUpdateComponent,
        StudentAttendanceDeleteDialogComponent,
        StudentAttendanceDeletePopupComponent
    ],
    entryComponents: [
        StudentAttendanceComponent,
        StudentAttendanceUpdateComponent,
        StudentAttendanceDeleteDialogComponent,
        StudentAttendanceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectStudentAttendanceModule {}

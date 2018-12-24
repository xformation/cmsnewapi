import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsprojectSharedModule } from 'app/shared';
import {
    DepartmentsComponent,
    DepartmentsDetailComponent,
    DepartmentsUpdateComponent,
    DepartmentsDeletePopupComponent,
    DepartmentsDeleteDialogComponent,
    departmentsRoute,
    departmentsPopupRoute
} from './';

const ENTITY_STATES = [...departmentsRoute, ...departmentsPopupRoute];

@NgModule({
    imports: [CmsprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartmentsComponent,
        DepartmentsDetailComponent,
        DepartmentsUpdateComponent,
        DepartmentsDeleteDialogComponent,
        DepartmentsDeletePopupComponent
    ],
    entryComponents: [DepartmentsComponent, DepartmentsUpdateComponent, DepartmentsDeleteDialogComponent, DepartmentsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectDepartmentsModule {}

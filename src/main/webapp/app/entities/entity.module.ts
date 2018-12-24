import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmsprojectStudentYearModule } from './student-year/student-year.module';
import { CmsprojectSectionModule } from './section/section.module';
import { CmsprojectSemesterModule } from './semester/semester.module';
import { CmsprojectStudentAttendanceModule } from './student-attendance/student-attendance.module';
import { CmsprojectPeriodsModule } from './periods/periods.module';
import { CmsprojectSubjectModule } from './subject/subject.module';
import { CmsprojectTeacherModule } from './teacher/teacher.module';
import { CmsprojectStudentModule } from './student/student.module';
import { CmsprojectCollegeBranchesModule } from './college-branches/college-branches.module';
import { CmsprojectDepartmentsModule } from './departments/departments.module';
import { CmsprojectLocationModule } from './location/location.module';
import { CmsprojectCollegeModule } from './college/college.module';
import { CmsprojectLegalEntityModule } from './legal-entity/legal-entity.module';
import { CmsprojectAuthorizedSignatoryModule } from './authorized-signatory/authorized-signatory.module';
import { CmsprojectBankAccountsModule } from './bank-accounts/bank-accounts.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CmsprojectStudentYearModule,
        CmsprojectSectionModule,
        CmsprojectSemesterModule,
        CmsprojectStudentAttendanceModule,
        CmsprojectPeriodsModule,
        CmsprojectSubjectModule,
        CmsprojectTeacherModule,
        CmsprojectStudentModule,
        CmsprojectCollegeBranchesModule,
        CmsprojectDepartmentsModule,
        CmsprojectLocationModule,
        CmsprojectCollegeModule,
        CmsprojectLegalEntityModule,
        CmsprojectAuthorizedSignatoryModule,
        CmsprojectBankAccountsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsprojectEntityModule {}

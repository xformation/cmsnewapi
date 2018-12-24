/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { StudentAttendanceDetailComponent } from 'app/entities/student-attendance/student-attendance-detail.component';
import { StudentAttendance } from 'app/shared/model/student-attendance.model';

describe('Component Tests', () => {
    describe('StudentAttendance Management Detail Component', () => {
        let comp: StudentAttendanceDetailComponent;
        let fixture: ComponentFixture<StudentAttendanceDetailComponent>;
        const route = ({ data: of({ studentAttendance: new StudentAttendance(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [StudentAttendanceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StudentAttendanceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentAttendanceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.studentAttendance).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

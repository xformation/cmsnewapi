/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { StudentAttendanceComponent } from 'app/entities/student-attendance/student-attendance.component';
import { StudentAttendanceService } from 'app/entities/student-attendance/student-attendance.service';
import { StudentAttendance } from 'app/shared/model/student-attendance.model';

describe('Component Tests', () => {
    describe('StudentAttendance Management Component', () => {
        let comp: StudentAttendanceComponent;
        let fixture: ComponentFixture<StudentAttendanceComponent>;
        let service: StudentAttendanceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [StudentAttendanceComponent],
                providers: []
            })
                .overrideTemplate(StudentAttendanceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentAttendanceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentAttendanceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StudentAttendance(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.studentAttendances[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

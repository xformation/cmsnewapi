/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { StudentYearComponent } from 'app/entities/student-year/student-year.component';
import { StudentYearService } from 'app/entities/student-year/student-year.service';
import { StudentYear } from 'app/shared/model/student-year.model';

describe('Component Tests', () => {
    describe('StudentYear Management Component', () => {
        let comp: StudentYearComponent;
        let fixture: ComponentFixture<StudentYearComponent>;
        let service: StudentYearService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [StudentYearComponent],
                providers: []
            })
                .overrideTemplate(StudentYearComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentYearComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentYearService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StudentYear(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.studentYears[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

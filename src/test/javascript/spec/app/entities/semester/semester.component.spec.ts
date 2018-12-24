/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { SemesterComponent } from 'app/entities/semester/semester.component';
import { SemesterService } from 'app/entities/semester/semester.service';
import { Semester } from 'app/shared/model/semester.model';

describe('Component Tests', () => {
    describe('Semester Management Component', () => {
        let comp: SemesterComponent;
        let fixture: ComponentFixture<SemesterComponent>;
        let service: SemesterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [SemesterComponent],
                providers: []
            })
                .overrideTemplate(SemesterComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SemesterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemesterService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Semester(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.semesters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { StudentYearDetailComponent } from 'app/entities/student-year/student-year-detail.component';
import { StudentYear } from 'app/shared/model/student-year.model';

describe('Component Tests', () => {
    describe('StudentYear Management Detail Component', () => {
        let comp: StudentYearDetailComponent;
        let fixture: ComponentFixture<StudentYearDetailComponent>;
        const route = ({ data: of({ studentYear: new StudentYear(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [StudentYearDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StudentYearDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentYearDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.studentYear).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

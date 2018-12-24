/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { StudentYearUpdateComponent } from 'app/entities/student-year/student-year-update.component';
import { StudentYearService } from 'app/entities/student-year/student-year.service';
import { StudentYear } from 'app/shared/model/student-year.model';

describe('Component Tests', () => {
    describe('StudentYear Management Update Component', () => {
        let comp: StudentYearUpdateComponent;
        let fixture: ComponentFixture<StudentYearUpdateComponent>;
        let service: StudentYearService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [StudentYearUpdateComponent]
            })
                .overrideTemplate(StudentYearUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentYearUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentYearService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StudentYear(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.studentYear = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StudentYear();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.studentYear = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

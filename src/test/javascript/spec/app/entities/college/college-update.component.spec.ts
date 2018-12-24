/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { CollegeUpdateComponent } from 'app/entities/college/college-update.component';
import { CollegeService } from 'app/entities/college/college.service';
import { College } from 'app/shared/model/college.model';

describe('Component Tests', () => {
    describe('College Management Update Component', () => {
        let comp: CollegeUpdateComponent;
        let fixture: ComponentFixture<CollegeUpdateComponent>;
        let service: CollegeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [CollegeUpdateComponent]
            })
                .overrideTemplate(CollegeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CollegeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CollegeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new College(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.college = entity;
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
                    const entity = new College();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.college = entity;
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

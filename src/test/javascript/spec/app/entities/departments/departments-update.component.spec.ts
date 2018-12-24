/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { DepartmentsUpdateComponent } from 'app/entities/departments/departments-update.component';
import { DepartmentsService } from 'app/entities/departments/departments.service';
import { Departments } from 'app/shared/model/departments.model';

describe('Component Tests', () => {
    describe('Departments Management Update Component', () => {
        let comp: DepartmentsUpdateComponent;
        let fixture: ComponentFixture<DepartmentsUpdateComponent>;
        let service: DepartmentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [DepartmentsUpdateComponent]
            })
                .overrideTemplate(DepartmentsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DepartmentsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Departments(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.departments = entity;
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
                    const entity = new Departments();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.departments = entity;
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

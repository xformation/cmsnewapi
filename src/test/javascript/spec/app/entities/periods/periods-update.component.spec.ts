/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { PeriodsUpdateComponent } from 'app/entities/periods/periods-update.component';
import { PeriodsService } from 'app/entities/periods/periods.service';
import { Periods } from 'app/shared/model/periods.model';

describe('Component Tests', () => {
    describe('Periods Management Update Component', () => {
        let comp: PeriodsUpdateComponent;
        let fixture: ComponentFixture<PeriodsUpdateComponent>;
        let service: PeriodsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [PeriodsUpdateComponent]
            })
                .overrideTemplate(PeriodsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PeriodsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Periods(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.periods = entity;
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
                    const entity = new Periods();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.periods = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { CollegeBranchesUpdateComponent } from 'app/entities/college-branches/college-branches-update.component';
import { CollegeBranchesService } from 'app/entities/college-branches/college-branches.service';
import { CollegeBranches } from 'app/shared/model/college-branches.model';

describe('Component Tests', () => {
    describe('CollegeBranches Management Update Component', () => {
        let comp: CollegeBranchesUpdateComponent;
        let fixture: ComponentFixture<CollegeBranchesUpdateComponent>;
        let service: CollegeBranchesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [CollegeBranchesUpdateComponent]
            })
                .overrideTemplate(CollegeBranchesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CollegeBranchesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CollegeBranchesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CollegeBranches(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.collegeBranches = entity;
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
                    const entity = new CollegeBranches();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.collegeBranches = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { AuthorizedSignatoryUpdateComponent } from 'app/entities/authorized-signatory/authorized-signatory-update.component';
import { AuthorizedSignatoryService } from 'app/entities/authorized-signatory/authorized-signatory.service';
import { AuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';

describe('Component Tests', () => {
    describe('AuthorizedSignatory Management Update Component', () => {
        let comp: AuthorizedSignatoryUpdateComponent;
        let fixture: ComponentFixture<AuthorizedSignatoryUpdateComponent>;
        let service: AuthorizedSignatoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [AuthorizedSignatoryUpdateComponent]
            })
                .overrideTemplate(AuthorizedSignatoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthorizedSignatoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorizedSignatoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AuthorizedSignatory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.authorizedSignatory = entity;
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
                    const entity = new AuthorizedSignatory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.authorizedSignatory = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmsprojectTestModule } from '../../../test.module';
import { AuthorizedSignatoryDeleteDialogComponent } from 'app/entities/authorized-signatory/authorized-signatory-delete-dialog.component';
import { AuthorizedSignatoryService } from 'app/entities/authorized-signatory/authorized-signatory.service';

describe('Component Tests', () => {
    describe('AuthorizedSignatory Management Delete Component', () => {
        let comp: AuthorizedSignatoryDeleteDialogComponent;
        let fixture: ComponentFixture<AuthorizedSignatoryDeleteDialogComponent>;
        let service: AuthorizedSignatoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [AuthorizedSignatoryDeleteDialogComponent]
            })
                .overrideTemplate(AuthorizedSignatoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthorizedSignatoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorizedSignatoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

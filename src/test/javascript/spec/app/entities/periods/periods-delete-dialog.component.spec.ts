/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmsprojectTestModule } from '../../../test.module';
import { PeriodsDeleteDialogComponent } from 'app/entities/periods/periods-delete-dialog.component';
import { PeriodsService } from 'app/entities/periods/periods.service';

describe('Component Tests', () => {
    describe('Periods Management Delete Component', () => {
        let comp: PeriodsDeleteDialogComponent;
        let fixture: ComponentFixture<PeriodsDeleteDialogComponent>;
        let service: PeriodsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [PeriodsDeleteDialogComponent]
            })
                .overrideTemplate(PeriodsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PeriodsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodsService);
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

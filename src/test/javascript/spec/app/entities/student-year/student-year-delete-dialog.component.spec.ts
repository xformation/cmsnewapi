/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmsprojectTestModule } from '../../../test.module';
import { StudentYearDeleteDialogComponent } from 'app/entities/student-year/student-year-delete-dialog.component';
import { StudentYearService } from 'app/entities/student-year/student-year.service';

describe('Component Tests', () => {
    describe('StudentYear Management Delete Component', () => {
        let comp: StudentYearDeleteDialogComponent;
        let fixture: ComponentFixture<StudentYearDeleteDialogComponent>;
        let service: StudentYearService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [StudentYearDeleteDialogComponent]
            })
                .overrideTemplate(StudentYearDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentYearDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentYearService);
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

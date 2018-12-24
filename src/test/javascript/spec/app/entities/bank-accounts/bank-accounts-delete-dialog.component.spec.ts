/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CmsprojectTestModule } from '../../../test.module';
import { BankAccountsDeleteDialogComponent } from 'app/entities/bank-accounts/bank-accounts-delete-dialog.component';
import { BankAccountsService } from 'app/entities/bank-accounts/bank-accounts.service';

describe('Component Tests', () => {
    describe('BankAccounts Management Delete Component', () => {
        let comp: BankAccountsDeleteDialogComponent;
        let fixture: ComponentFixture<BankAccountsDeleteDialogComponent>;
        let service: BankAccountsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [BankAccountsDeleteDialogComponent]
            })
                .overrideTemplate(BankAccountsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankAccountsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountsService);
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

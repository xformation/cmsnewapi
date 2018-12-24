/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { BankAccountsUpdateComponent } from 'app/entities/bank-accounts/bank-accounts-update.component';
import { BankAccountsService } from 'app/entities/bank-accounts/bank-accounts.service';
import { BankAccounts } from 'app/shared/model/bank-accounts.model';

describe('Component Tests', () => {
    describe('BankAccounts Management Update Component', () => {
        let comp: BankAccountsUpdateComponent;
        let fixture: ComponentFixture<BankAccountsUpdateComponent>;
        let service: BankAccountsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [BankAccountsUpdateComponent]
            })
                .overrideTemplate(BankAccountsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankAccountsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BankAccounts(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bankAccounts = entity;
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
                    const entity = new BankAccounts();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bankAccounts = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { BankAccountsDetailComponent } from 'app/entities/bank-accounts/bank-accounts-detail.component';
import { BankAccounts } from 'app/shared/model/bank-accounts.model';

describe('Component Tests', () => {
    describe('BankAccounts Management Detail Component', () => {
        let comp: BankAccountsDetailComponent;
        let fixture: ComponentFixture<BankAccountsDetailComponent>;
        const route = ({ data: of({ bankAccounts: new BankAccounts(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [BankAccountsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BankAccountsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankAccountsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bankAccounts).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

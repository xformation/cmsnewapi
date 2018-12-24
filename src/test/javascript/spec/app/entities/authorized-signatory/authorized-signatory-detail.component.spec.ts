/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { AuthorizedSignatoryDetailComponent } from 'app/entities/authorized-signatory/authorized-signatory-detail.component';
import { AuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';

describe('Component Tests', () => {
    describe('AuthorizedSignatory Management Detail Component', () => {
        let comp: AuthorizedSignatoryDetailComponent;
        let fixture: ComponentFixture<AuthorizedSignatoryDetailComponent>;
        const route = ({ data: of({ authorizedSignatory: new AuthorizedSignatory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [AuthorizedSignatoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AuthorizedSignatoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthorizedSignatoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.authorizedSignatory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

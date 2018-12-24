/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { AuthorizedSignatoryComponent } from 'app/entities/authorized-signatory/authorized-signatory.component';
import { AuthorizedSignatoryService } from 'app/entities/authorized-signatory/authorized-signatory.service';
import { AuthorizedSignatory } from 'app/shared/model/authorized-signatory.model';

describe('Component Tests', () => {
    describe('AuthorizedSignatory Management Component', () => {
        let comp: AuthorizedSignatoryComponent;
        let fixture: ComponentFixture<AuthorizedSignatoryComponent>;
        let service: AuthorizedSignatoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [AuthorizedSignatoryComponent],
                providers: []
            })
                .overrideTemplate(AuthorizedSignatoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthorizedSignatoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorizedSignatoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AuthorizedSignatory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.authorizedSignatories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

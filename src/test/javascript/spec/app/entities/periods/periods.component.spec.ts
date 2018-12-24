/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { PeriodsComponent } from 'app/entities/periods/periods.component';
import { PeriodsService } from 'app/entities/periods/periods.service';
import { Periods } from 'app/shared/model/periods.model';

describe('Component Tests', () => {
    describe('Periods Management Component', () => {
        let comp: PeriodsComponent;
        let fixture: ComponentFixture<PeriodsComponent>;
        let service: PeriodsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [PeriodsComponent],
                providers: []
            })
                .overrideTemplate(PeriodsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PeriodsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Periods(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.periods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

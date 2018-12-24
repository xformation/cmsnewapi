/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { PeriodsDetailComponent } from 'app/entities/periods/periods-detail.component';
import { Periods } from 'app/shared/model/periods.model';

describe('Component Tests', () => {
    describe('Periods Management Detail Component', () => {
        let comp: PeriodsDetailComponent;
        let fixture: ComponentFixture<PeriodsDetailComponent>;
        const route = ({ data: of({ periods: new Periods(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [PeriodsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PeriodsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PeriodsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.periods).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

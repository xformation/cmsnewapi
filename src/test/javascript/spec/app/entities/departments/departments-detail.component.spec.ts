/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { DepartmentsDetailComponent } from 'app/entities/departments/departments-detail.component';
import { Departments } from 'app/shared/model/departments.model';

describe('Component Tests', () => {
    describe('Departments Management Detail Component', () => {
        let comp: DepartmentsDetailComponent;
        let fixture: ComponentFixture<DepartmentsDetailComponent>;
        const route = ({ data: of({ departments: new Departments(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [DepartmentsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DepartmentsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartmentsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.departments).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

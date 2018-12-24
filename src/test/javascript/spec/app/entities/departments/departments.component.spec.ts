/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { DepartmentsComponent } from 'app/entities/departments/departments.component';
import { DepartmentsService } from 'app/entities/departments/departments.service';
import { Departments } from 'app/shared/model/departments.model';

describe('Component Tests', () => {
    describe('Departments Management Component', () => {
        let comp: DepartmentsComponent;
        let fixture: ComponentFixture<DepartmentsComponent>;
        let service: DepartmentsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [DepartmentsComponent],
                providers: []
            })
                .overrideTemplate(DepartmentsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DepartmentsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Departments(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

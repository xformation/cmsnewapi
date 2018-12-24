/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { CollegeComponent } from 'app/entities/college/college.component';
import { CollegeService } from 'app/entities/college/college.service';
import { College } from 'app/shared/model/college.model';

describe('Component Tests', () => {
    describe('College Management Component', () => {
        let comp: CollegeComponent;
        let fixture: ComponentFixture<CollegeComponent>;
        let service: CollegeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [CollegeComponent],
                providers: []
            })
                .overrideTemplate(CollegeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CollegeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CollegeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new College(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.colleges[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

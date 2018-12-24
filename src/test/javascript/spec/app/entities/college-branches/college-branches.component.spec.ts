/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmsprojectTestModule } from '../../../test.module';
import { CollegeBranchesComponent } from 'app/entities/college-branches/college-branches.component';
import { CollegeBranchesService } from 'app/entities/college-branches/college-branches.service';
import { CollegeBranches } from 'app/shared/model/college-branches.model';

describe('Component Tests', () => {
    describe('CollegeBranches Management Component', () => {
        let comp: CollegeBranchesComponent;
        let fixture: ComponentFixture<CollegeBranchesComponent>;
        let service: CollegeBranchesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [CollegeBranchesComponent],
                providers: []
            })
                .overrideTemplate(CollegeBranchesComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CollegeBranchesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CollegeBranchesService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CollegeBranches(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.collegeBranches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

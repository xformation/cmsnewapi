/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CmsprojectTestModule } from '../../../test.module';
import { CollegeBranchesDetailComponent } from 'app/entities/college-branches/college-branches-detail.component';
import { CollegeBranches } from 'app/shared/model/college-branches.model';

describe('Component Tests', () => {
    describe('CollegeBranches Management Detail Component', () => {
        let comp: CollegeBranchesDetailComponent;
        let fixture: ComponentFixture<CollegeBranchesDetailComponent>;
        const route = ({ data: of({ collegeBranches: new CollegeBranches(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CmsprojectTestModule],
                declarations: [CollegeBranchesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CollegeBranchesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CollegeBranchesDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.collegeBranches).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

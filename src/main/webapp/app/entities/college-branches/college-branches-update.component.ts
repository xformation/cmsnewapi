import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICollegeBranches } from 'app/shared/model/college-branches.model';
import { CollegeBranchesService } from './college-branches.service';
import { ICollege } from 'app/shared/model/college.model';
import { CollegeService } from 'app/entities/college';

@Component({
    selector: 'jhi-college-branches-update',
    templateUrl: './college-branches-update.component.html'
})
export class CollegeBranchesUpdateComponent implements OnInit {
    private _collegeBranches: ICollegeBranches;
    isSaving: boolean;

    colleges: ICollege[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private collegeBranchesService: CollegeBranchesService,
        private collegeService: CollegeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ collegeBranches }) => {
            this.collegeBranches = collegeBranches;
        });
        this.collegeService.query().subscribe(
            (res: HttpResponse<ICollege[]>) => {
                this.colleges = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.collegeBranches.id !== undefined) {
            this.subscribeToSaveResponse(this.collegeBranchesService.update(this.collegeBranches));
        } else {
            this.subscribeToSaveResponse(this.collegeBranchesService.create(this.collegeBranches));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICollegeBranches>>) {
        result.subscribe((res: HttpResponse<ICollegeBranches>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCollegeById(index: number, item: ICollege) {
        return item.id;
    }
    get collegeBranches() {
        return this._collegeBranches;
    }

    set collegeBranches(collegeBranches: ICollegeBranches) {
        this._collegeBranches = collegeBranches;
    }
}

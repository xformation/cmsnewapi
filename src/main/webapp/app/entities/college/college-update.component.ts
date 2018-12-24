import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICollege } from 'app/shared/model/college.model';
import { CollegeService } from './college.service';

@Component({
    selector: 'jhi-college-update',
    templateUrl: './college-update.component.html'
})
export class CollegeUpdateComponent implements OnInit {
    private _college: ICollege;
    isSaving: boolean;

    constructor(private collegeService: CollegeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ college }) => {
            this.college = college;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.college.id !== undefined) {
            this.subscribeToSaveResponse(this.collegeService.update(this.college));
        } else {
            this.subscribeToSaveResponse(this.collegeService.create(this.college));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICollege>>) {
        result.subscribe((res: HttpResponse<ICollege>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get college() {
        return this._college;
    }

    set college(college: ICollege) {
        this._college = college;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISemester } from 'app/shared/model/semester.model';
import { SemesterService } from './semester.service';

@Component({
    selector: 'jhi-semester-update',
    templateUrl: './semester-update.component.html'
})
export class SemesterUpdateComponent implements OnInit {
    private _semester: ISemester;
    isSaving: boolean;

    constructor(private semesterService: SemesterService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ semester }) => {
            this.semester = semester;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.semester.id !== undefined) {
            this.subscribeToSaveResponse(this.semesterService.update(this.semester));
        } else {
            this.subscribeToSaveResponse(this.semesterService.create(this.semester));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISemester>>) {
        result.subscribe((res: HttpResponse<ISemester>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get semester() {
        return this._semester;
    }

    set semester(semester: ISemester) {
        this._semester = semester;
    }
}

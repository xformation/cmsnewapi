import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStudentYear } from 'app/shared/model/student-year.model';
import { StudentYearService } from './student-year.service';

@Component({
    selector: 'jhi-student-year-update',
    templateUrl: './student-year-update.component.html'
})
export class StudentYearUpdateComponent implements OnInit {
    private _studentYear: IStudentYear;
    isSaving: boolean;

    constructor(private studentYearService: StudentYearService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ studentYear }) => {
            this.studentYear = studentYear;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.studentYear.id !== undefined) {
            this.subscribeToSaveResponse(this.studentYearService.update(this.studentYear));
        } else {
            this.subscribeToSaveResponse(this.studentYearService.create(this.studentYear));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudentYear>>) {
        result.subscribe((res: HttpResponse<IStudentYear>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get studentYear() {
        return this._studentYear;
    }

    set studentYear(studentYear: IStudentYear) {
        this._studentYear = studentYear;
    }
}

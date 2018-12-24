import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDepartments } from 'app/shared/model/departments.model';
import { DepartmentsService } from './departments.service';

@Component({
    selector: 'jhi-departments-update',
    templateUrl: './departments-update.component.html'
})
export class DepartmentsUpdateComponent implements OnInit {
    private _departments: IDepartments;
    isSaving: boolean;

    constructor(private departmentsService: DepartmentsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ departments }) => {
            this.departments = departments;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.departments.id !== undefined) {
            this.subscribeToSaveResponse(this.departmentsService.update(this.departments));
        } else {
            this.subscribeToSaveResponse(this.departmentsService.create(this.departments));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDepartments>>) {
        result.subscribe((res: HttpResponse<IDepartments>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get departments() {
        return this._departments;
    }

    set departments(departments: IDepartments) {
        this._departments = departments;
    }
}
